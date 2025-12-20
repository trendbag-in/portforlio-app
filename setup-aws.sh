#!/bin/bash

# Setup script to help configure AWS resources for trendbag.in
# This script helps with initial setup and verification

set -e

DOMAIN="trendbag.in"
STACK_NAME="trendbag-website"
REGION="us-east-1"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔧 AWS Setup Helper for ${DOMAIN}${NC}\n"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed${NC}"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity --profile tb &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Run 'aws configure --profile tb'${NC}"
    exit 1
fi

echo -e "${GREEN}✓ AWS CLI configured${NC}\n"

# Check for SSL Certificate
echo -e "${YELLOW}Checking for SSL certificate in ${REGION}...${NC}"
CERT_ARN=$(aws acm list-certificates \
    --profile tb \
    --region ${REGION} \
    --query "CertificateSummaryList[?DomainName=='${DOMAIN}' || DomainName=='*.${DOMAIN}'].CertificateArn" \
    --output text | head -n1)

if [ -z "$CERT_ARN" ]; then
    echo -e "${YELLOW}⚠️  No SSL certificate found for ${DOMAIN}${NC}"
    echo -e "${YELLOW}   You need to create one in ACM (${REGION}) before deploying${NC}"
    echo -e "${YELLOW}   Visit: https://console.aws.amazon.com/acm/home?region=${REGION}${NC}\n"
else
    echo -e "${GREEN}✓ Found certificate: ${CERT_ARN}${NC}\n"
fi

# Check if stack exists
echo -e "${YELLOW}Checking CloudFormation stack...${NC}"
if aws cloudformation describe-stacks --profile tb --stack-name ${STACK_NAME} --region ${REGION} &> /dev/null; then
    echo -e "${GREEN}✓ Stack '${STACK_NAME}' exists${NC}"
    
    # Get outputs
    DIST_ID=$(aws cloudformation describe-stacks \
        --profile tb \
        --stack-name ${STACK_NAME} \
        --region ${REGION} \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
        --output text)
    
    CLOUDFRONT_DOMAIN=$(aws cloudformation describe-stacks \
        --profile tb \
        --stack-name ${STACK_NAME} \
        --region ${REGION} \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
        --output text)
    
    if [ -n "$DIST_ID" ]; then
        echo -e "${GREEN}✓ CloudFront Distribution ID: ${DIST_ID}${NC}"
        echo -e "${YELLOW}   Update this in deploy.sh:${NC}"
        echo -e "   CLOUDFRONT_DISTRIBUTION_ID=\"${DIST_ID}\""
    fi
    
    if [ -n "$CLOUDFRONT_DOMAIN" ]; then
        echo -e "${GREEN}✓ CloudFront Domain: ${CLOUDFRONT_DOMAIN}${NC}"
        echo -e "${YELLOW}   Configure DNS to point to this domain${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Stack '${STACK_NAME}' does not exist${NC}"
    echo -e "${YELLOW}   Deploy it using:${NC}"
    if [ -n "$CERT_ARN" ]; then
        echo -e "   aws cloudformation create-stack \\"
        echo -e "     --profile tb \\"
        echo -e "     --stack-name ${STACK_NAME} \\"
        echo -e "     --template-body file://cloudformation.yaml \\"
        echo -e "     --parameters ParameterKey=DomainName,ParameterValue=${DOMAIN} \\"
        echo -e "                  ParameterKey=CertificateArn,ParameterValue=${CERT_ARN} \\"
        echo -e "     --region ${REGION}"
    else
        echo -e "   (First create SSL certificate, then deploy stack)"
    fi
fi

echo -e "\n${GREEN}Setup check complete!${NC}"

