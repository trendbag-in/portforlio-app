# CloudFront Deployment Guide for trendbag.in

This guide will help you deploy the TrendBag React static website to AWS CloudFront on your domain `trendbag.in`.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
   ```bash
   # Install AWS CLI (if not already installed)
   # macOS
   brew install awscli
   
   # Configure AWS credentials
   aws configure
   ```
3. **Domain** `trendbag.in` registered and managed in Route53 (or another DNS provider)
4. **SSL Certificate** in AWS Certificate Manager (ACM) for `trendbag.in` and `www.trendbag.in`
   - Certificate must be in `us-east-1` region (required for CloudFront)

## Step 1: Create SSL Certificate

1. Go to AWS Certificate Manager (ACM) in the **us-east-1** region
2. Request a public certificate for:
   - `trendbag.in`
   - `www.trendbag.in`
3. Validate the certificate using DNS validation (recommended) or email validation
4. Copy the Certificate ARN (you'll need it for Step 2)

## Step 2: Deploy Infrastructure with CloudFormation

Deploy the CloudFormation stack to create the S3 bucket and CloudFront distribution:

```bash
# Make the deploy script executable
chmod +x deploy.sh

# Deploy CloudFormation stack
aws cloudformation create-stack \
  --stack-name trendbag-website \
  --template-body file://cloudformation.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=trendbag.in \
               ParameterKey=CertificateArn,ParameterValue=YOUR_CERTIFICATE_ARN \
  --region us-east-1

# Wait for stack creation (this may take 10-15 minutes)
aws cloudformation wait stack-create-complete \
  --stack-name trendbag-website \
  --region us-east-1

# Get the CloudFront Distribution ID
aws cloudformation describe-stacks \
  --stack-name trendbag-website \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
  --output text
```

**Important:** Copy the CloudFront Distribution ID and update it in `deploy.sh`:

```bash
# Edit deploy.sh and set CLOUDFRONT_DISTRIBUTION_ID
CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"  # Your actual distribution ID
```

Alternatively, you can set it as an environment variable:
```bash
export CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"
```

## Step 3: Configure Route53 DNS

After the CloudFormation stack is created, configure your DNS records:

1. Get the CloudFront domain name:
   ```bash
   aws cloudformation describe-stacks \
     --stack-name trendbag-website \
     --region us-east-1 \
     --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
     --output text
   ```

2. In Route53 (or your DNS provider), create/update records:
   - **A Record (Alias)** for `trendbag.in` → CloudFront distribution
   - **A Record (Alias)** for `www.trendbag.in` → CloudFront distribution
   
   Or if using Route53:
   ```bash
   # Get your hosted zone ID
   HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
     --dns-name trendbag.in \
     --query 'HostedZones[0].Id' \
     --output text | cut -d'/' -f3)
   
   # Get CloudFront domain name
   CLOUDFRONT_DOMAIN=$(aws cloudformation describe-stacks \
     --stack-name trendbag-website \
     --region us-east-1 \
     --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
     --output text)
   
   # Create DNS record (replace HOSTED_ZONE_ID and CLOUDFRONT_DOMAIN)
   aws route53 change-resource-record-sets \
     --hosted-zone-id $HOSTED_ZONE_ID \
     --change-batch '{
       "Changes": [{
         "Action": "UPSERT",
         "ResourceRecordSet": {
           "Name": "trendbag.in",
           "Type": "A",
           "AliasTarget": {
             "HostedZoneId": "Z2FDTNDATAQYW2",
             "DNSName": "'$CLOUDFRONT_DOMAIN'",
             "EvaluateTargetHealth": false
           }
         }
       }]
     }'
   ```

## Step 4: Deploy Your Website

Once infrastructure is set up, deploy your React app:

```bash
# Install dependencies (if not already done)
npm install

# Deploy to CloudFront
npm run deploy:cloudfront

# Or directly
./deploy.sh
```

The deployment script will:
1. Build your React app
2. Upload files to S3 with appropriate cache headers
3. Invalidate CloudFront cache

## Step 5: Verify Deployment

1. Wait a few minutes for DNS propagation (can take up to 48 hours, usually much faster)
2. Visit `https://trendbag.in` in your browser
3. Check that the site loads correctly

## Updating the Website

To update your website after making changes:

```bash
# Make your code changes, then:
npm run deploy:cloudfront
```

The script will automatically:
- Build the latest version
- Sync files to S3
- Invalidate CloudFront cache

## Troubleshooting

### CloudFront Distribution Not Found
- Make sure you've set `CLOUDFRONT_DISTRIBUTION_ID` in `deploy.sh` or as an environment variable
- Verify the stack was created successfully: `aws cloudformation describe-stacks --stack-name trendbag-website`

### SSL Certificate Issues
- Ensure certificate is in `us-east-1` region
- Verify certificate is validated and active
- Check that certificate covers both `trendbag.in` and `www.trendbag.in`

### DNS Not Resolving
- Verify DNS records are correctly configured
- Check DNS propagation: `dig trendbag.in` or use online tools
- Ensure CloudFront distribution is deployed and active

### 403 Forbidden Errors
- Check S3 bucket policy allows CloudFront access
- Verify Origin Access Control (OAC) is configured correctly
- Ensure files are uploaded to S3

### Files Not Updating
- CloudFront cache invalidation can take 5-15 minutes
- Check invalidation status in AWS Console
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

## Cost Optimization

- The CloudFormation template uses `PriceClass_100` (North America and Europe only)
- S3 storage costs are minimal for static sites
- CloudFront charges for data transfer (first 1TB/month is free in most regions)
- Consider setting up CloudWatch alarms for cost monitoring

## Cleanup

To remove all resources:

```bash
# Empty S3 bucket first
aws s3 rm s3://trendbag.in --recursive

# Delete CloudFormation stack
aws cloudformation delete-stack \
  --stack-name trendbag-website \
  --region us-east-1
```

## Additional Resources

- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Route53 DNS Configuration](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/)

