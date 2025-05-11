#!/bin/bash

# Exit on error
set -e

# Configuration
REMOTE_USER="user"
REMOTE_HOST="viciososocultos.com"
REMOTE_PATH="/var/www/viciososocultos.com"
DIST_FOLDER="./dist"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process...${NC}"

# Build the project
echo -e "${YELLOW}Building project...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$DIST_FOLDER" ]; then
  echo -e "${RED}Build failed! Dist folder not found.${NC}"
  exit 1
fi

# Compress the dist folder
echo -e "${YELLOW}Compressing dist folder...${NC}"
tar -czf dist.tar.gz -C dist .

# Upload to server
echo -e "${YELLOW}Uploading to server...${NC}"
scp dist.tar.gz $REMOTE_USER@$REMOTE_HOST:/tmp/

# Execute commands on the server
echo -e "${YELLOW}Deploying on server...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST << EOF
  # Backup current version
  if [ -d "$REMOTE_PATH" ]; then
    timestamp=\$(date +%Y%m%d%H%M%S)
    mkdir -p ${REMOTE_PATH}_backup
    cp -r $REMOTE_PATH ${REMOTE_PATH}_backup/\$timestamp
  fi

  # Clear current files but keep the .well-known directory if it exists
  mkdir -p $REMOTE_PATH
  find $REMOTE_PATH -mindepth 1 -not -path "$REMOTE_PATH/.well-known*" -delete

  # Extract new files
  tar -xzf /tmp/dist.tar.gz -C $REMOTE_PATH

  # Set permissions
  chmod -R 755 $REMOTE_PATH
  
  # Remove the uploaded tar file
  rm /tmp/dist.tar.gz
  
  # Restart Nginx if needed
  sudo systemctl reload nginx
EOF

# Clean up local tar
rm dist.tar.gz

echo -e "${GREEN}Deployment completed successfully!${NC}" 