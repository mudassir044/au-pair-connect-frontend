#!/bin/bash

# Netlify build script for frontend only
echo "Installing dependencies..."
npm install

echo "Building frontend with Vite..."
npx vite build

echo "Build completed successfully!"