import {Serverless} from 'serverless/aws';
import DynamoDbTable from "./Resoruces/dynamodb.resource";
import CognitoUserPoolWithClient from "./Resoruces/cognitoUserPool.resource";
import roles from "./Resoruces/roles.resources";
import AuthRoutes from "./Modules/Auth/routes";
import ForumRoutes from "./Modules/Forum/routes";
import RoleMapping from "./Resoruces/roleMapping.resource";
import {REGION, SERVERLESSAPPNAME} from "./configs/app_infastructure.config";

const serverlessConfiguration: Serverless = {
    service: {
        name: SERVERLESSAPPNAME,
        // app and org for use with dashboard.serverless.com
        // app: your-app-name,
        // org: your-org-name,
    },
    frameworkVersion: '>=1.72.0',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    plugins: ['serverless-webpack', 'serverless-offline'],
    provider: {
        name: 'aws',
        region: REGION,
        runtime: 'nodejs12.x',
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
    },
    functions: {
        ...AuthRoutes,
        ...ForumRoutes
    },
    resources: {
        Resources: {
            ...DynamoDbTable,
            ...CognitoUserPoolWithClient,
            ...roles,
            ...RoleMapping
        }
    }
}

module.exports = serverlessConfiguration;
