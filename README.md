# pulumi-node-docker

## How to

### local app

npx create-next-app@latest

create dockerfile & .dockerignore

docker build --target prod -t regfatbeard.azurecr.io/my-app:latest .

docker run -p 3000:3000 regfatbeard.azurecr.io/my-app:latest

### devops

mkdir devops

pulumi new

### push images

az acr login --name regfatbeard.azurecr.io

docker push regfatbeard.azurecr.io/my-app:latest

___

https://www.pulumi.com/registry/packages/azure-native/api-docs/