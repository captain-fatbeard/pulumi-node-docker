# pulumi-node-docker

## How to

npx create-next-app@latest

docker build --target prod -t my-app .

docker run -p 3000:3000 my-app

pulumi new

https://www.pulumi.com/registry/packages/azure-native/api-docs/


az acr login --name regfatbeard.azurecr.io

docker build --target prod -t regfatbeard.azurecr.io/my-app:latest .

docker push regfatbeard.azurecr.io/my-app:latest