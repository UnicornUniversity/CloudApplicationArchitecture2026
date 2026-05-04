import dotenv from "dotenv";
import {SecretsManagerClient, GetSecretValueCommand}
    from "@aws-sdk/client-secrets-manager";

dotenv.config();

const client = new SecretsManagerClient(
    {
        region: "eu-north-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_ACCESS_KEY
        }
    }
);

const response = await client.send(new GetSecretValueCommand({
    SecretId: "weather-api-key",
    VersionStage: "AWSCURRENT"
}));

console.log("weather-api-key = " + response.SecretString);

