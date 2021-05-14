import {SERVERLESSAPPNAME} from "../configs/app_infastructure.config";

const CognitoUserPoolWithClient = {
    UserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
            "UsernameConfiguration": {
                "CaseSensitive": true
            },
            "AutoVerifiedAttributes": [
                "email"
            ],
            "UserPoolName": `${SERVERLESSAPPNAME}UserPool`,
            "Schema": [
                {
                    "Name": "email",
                    "AttributeDataType": "String",
                    "Mutable": true,
                    "Required": true
                },
                {
                    "Name": "name",
                    "AttributeDataType": "String",
                    "Mutable": true,
                    "Required": true
                }
            ]
        }
    },
    UserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
            "ClientName": `${SERVERLESSAPPNAME}UserClient`,
            "ExplicitAuthFlows": ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"],
            "GenerateSecret": false,
            "UserPoolId": {"Ref": "UserPool"},
        }
    },
    IdentityPool: {
        Type: "AWS::Cognito::IdentityPool",
        Properties: {
            "IdentityPoolName": `${SERVERLESSAPPNAME}IdentityPool`,
            "AllowUnauthenticatedIdentities": true,
            "CognitoIdentityProviders": [
                {
                    "ClientId": {"Ref": "UserPoolClient"},
                    "ProviderName": {"Fn::GetAtt": ["UserPool", "ProviderName"]}
                }
            ]
        }
    }
}

export default CognitoUserPoolWithClient;
