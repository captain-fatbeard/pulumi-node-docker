import * as pulumi from '@pulumi/pulumi';
import { resources, containerregistry, web } from "@pulumi/azure-native";

const resourceGroup = new resources.ResourceGroup("rg-fatbeard");

const registry = new containerregistry.Registry('regFatbeard', {
    registryName: 'regfatbeard',
    resourceGroupName: resourceGroup.name,
    adminUserEnabled: true,
    sku: { name: 'Standard'},
})

const credentials = containerregistry.listRegistryCredentialsOutput({
    resourceGroupName: resourceGroup.name,
    registryName: registry.name,
});

const adminUsername = credentials.apply(credentials => credentials.username!);
const adminPassword = credentials.apply(credentials => credentials.passwords![0].value!);

const asp = new web.AppServicePlan('asp-my-app', {
    resourceGroupName: resourceGroup.name,
    kind: 'linux',
    reserved: true,
    sku: {
        name: "B1",
        tier: "Basic",
    },
});

const app = new web.WebApp('app-my-app', {
    resourceGroupName: resourceGroup.name,
    siteConfig: {
        appSettings: [
            { name: 'DOCKER_ENABLE_CI', value: "true" },
            { name: 'DOCKER_REGISTRY_SERVER_USERNAME', value: adminUsername },
            { name: 'DOCKER_REGISTRY_SERVER_PASSWORD', value: adminPassword },
            {
                name: 'DOCKER_REGISTRY_SERVER_URL',
                value: pulumi.interpolate`https://${registry.loginServer}`,
            },
        ],
        linuxFxVersion: pulumi.interpolate`DOCKER|${registry.loginServer}/my-app:latest`,
    },
    serverFarmId: asp.id,
})

export const webUrl = app.defaultHostName;
