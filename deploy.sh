#!/bin/bash

set -e

BUCKET_NAME="tb-portfolio"
AWS_PROFILE="tb"
REGION="us-east-1"
BUILD_DIR="./build"
CLOUDFRONT_DIST_ID="${CLOUDFRONT_DIST_ID:-EQF8S5T16TUDV}"  # Default distribution ID, can be overridden via env var
DOMAIN="trendbag.in"

echo "🚀 Starting deployment to S3 and CloudFront..."
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"
echo "Using AWS profile: $AWS_PROFILE"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "❌ ERROR: AWS CLI is not installed. Please install it first."
  exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity --profile "$AWS_PROFILE" &> /dev/null; then
  echo "❌ ERROR: AWS credentials not configured. Please run 'aws configure --profile $AWS_PROFILE'"
  exit 1
fi

# Build the React app
echo ""
echo "📦 Building React app..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ ERROR: Build directory not found. Build failed."
  exit 1
fi

echo "✓ Build completed successfully"

# Check if S3 bucket exists
echo ""
echo "🔍 Checking S3 bucket..."
if ! aws s3 ls --profile "$AWS_PROFILE" "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
  echo "✓ S3 bucket exists"
else
  echo "📦 Creating S3 bucket..."
  aws s3 mb --profile "$AWS_PROFILE" "s3://$BUCKET_NAME" --region "$REGION"
  
  # Enable static website hosting
  aws s3 website --profile "$AWS_PROFILE" "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html
  
  # Set bucket policy for CloudFront access
  ACCOUNT_ID=$(aws sts get-caller-identity --profile "$AWS_PROFILE" --query Account --output text)
  cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/*"
        }
      }
    }
  ]
}
EOF
  aws s3api put-bucket-policy --profile "$AWS_PROFILE" --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json
  rm /tmp/bucket-policy.json
  echo "✓ S3 bucket created and configured"
fi

# Deploy to S3
echo ""
echo "📤 Uploading files to S3..."

# Upload static assets (JS, CSS, images, etc.) with long cache
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --profile "$AWS_PROFILE" \
  --region "$REGION" \
  --delete \
  --exclude "*.map" \
  --exclude "*.html" \
  --exclude "*.json" \
  --cache-control "public, max-age=31536000, immutable"

# Upload HTML and JSON files with short cache and proper content types
find "$BUILD_DIR" -type f \( -name "*.html" -o -name "*.json" \) | while read file; do
  rel_path="${file#$BUILD_DIR/}"
  content_type="text/html"
  if [[ "$file" == *.json ]]; then
    content_type="application/json"
  fi
  aws s3 cp "$file" "s3://$BUCKET_NAME/$rel_path" \
    --profile "$AWS_PROFILE" \
    --region "$REGION" \
    --content-type "$content_type" \
    --cache-control "public, max-age=0, must-revalidate"
done

echo "✓ Files uploaded to S3"

# Invalidate CloudFront cache
echo ""
if [ -z "$CLOUDFRONT_DIST_ID" ]; then
  echo "🔍 Attempting to find CloudFront distribution ID..."
  # Try to find distribution ID by domain
  CLOUDFRONT_DIST_ID=$(aws cloudfront list-distributions \
    --profile "$AWS_PROFILE" \
    --query "DistributionList.Items[?Aliases.Items[?@=='${DOMAIN}']].Id" \
    --output text 2>/dev/null | head -n1)
fi

if [ -n "$CLOUDFRONT_DIST_ID" ]; then
  echo "🔄 Invalidating CloudFront cache for distribution: $CLOUDFRONT_DIST_ID"
  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --profile "$AWS_PROFILE" \
    --distribution-id "$CLOUDFRONT_DIST_ID" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)
  echo "✓ CloudFront invalidation created: $INVALIDATION_ID"
  echo "  Cache invalidation is in progress. It may take a few minutes to complete."
else
  echo "⚠️  WARNING: CloudFront distribution ID not found. Cache may not be invalidated."
  echo "   Set CLOUDFRONT_DIST_ID environment variable or ensure the distribution exists."
fi

echo ""
echo "✅ Deployment complete!"
echo "   Website URL: https://$DOMAIN"
