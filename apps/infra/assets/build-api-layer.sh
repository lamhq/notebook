#!/bin/bash
set -e

# Step 1: Run npm install for @mdpdf/mdpdf inside the Lambda base image
docker run --rm -v "$PWD/assets":/var/task -w /var/task \
  --entrypoint bash public.ecr.aws/lambda/nodejs:22-arm64 \
  -c "npm install @mdpdf/mdpdf"

# Step 2: Move node_modules into the layer directory structure
mkdir -p assets/layer/nodejs
mv assets/node_modules assets/layer/nodejs/

# Step 3: Zip the layer contents
cd assets/layer
zip -r ../api-layer.zip .
cd ../..

# Step 4: Clean up the layer build directory
rm -rf assets/layer
rm -f assets/package-lock.json assets/package.json
