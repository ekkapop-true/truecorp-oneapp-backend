# Remove .serverless deploy temporary folder
rm -rf .serverless

# Clean up all node_modules
rm -rf node_modules

# Remove layers depencencies
rm -rf layers/nodejs/**

# Re-install dependendies only production 
yarn install --production

# Copy to layers dependencies 
cp -r node_modules layers/nodejs
 
# Re-Install package again (with dev dependencies)
yarn install

# build app
yarn build

# Package and Deploy [with stage staging => .env.staging | production => .env.production]
# this action use serverless-dotenv-plugin plugin
serverless deploy --stage staging