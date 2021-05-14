# Serverless-TS-App

1 - go to configs/app_infrastructure.config.ts and set these 2 varialbes first :

            * SERVERLESSAPPNAME 
            * DynamoDbTableName 
            * Account ID
            * Region

2 - SLS deploy to create the infrastructure and deploy the app 3 - fetch the client id and the identity pool id and set
the variables. 4 - SLS deploy to deploy the app again with the rest of the variables
