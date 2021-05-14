import {ACCOUNT_ID, DynamoDbTableName, REGION} from "../configs/app_infastructure.config";

const roles = {
    ServerlessAppAuthRole: {
        Type: "AWS::IAM::Role",
        Properties: {
            AssumeRolePolicyDocument: {
                //"Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {
                            "Federated": "cognito-identity.amazonaws.com"
                        },
                        "Action": "sts:AssumeRoleWithWebIdentity",
                        "Condition": {
                            "StringEquals": {
                                "cognito-identity.amazonaws.com:aud": {"Ref": "IdentityPool"}
                            },
                            "ForAnyValue:StringLike": {
                                "cognito-identity.amazonaws.com:amr": "authenticated"
                            }
                        }
                    }
                ]
            },
            "Policies": [
                {
                    "PolicyName": "TableEditorPolicy",
                    "PolicyDocument": {
                        "Version": "2012-10-17",
                        "Statement": [
                            {
                                "Sid": "VisualEditor0",
                                "Effect": "Allow",
                                "Action": [
                                    "dynamodb:BatchGetItem",
                                    "dynamodb:BatchWriteItem",
                                    "dynamodb:PutItem",
                                    "dynamodb:DeleteItem",
                                    "dynamodb:GetItem",
                                    "dynamodb:Scan",
                                    "dynamodb:Query",
                                    "dynamodb:UpdateItem"
                                ],
                                "Resource": [
                                    `arn:aws:dynamodb:${REGION}:${ACCOUNT_ID}:table/${DynamoDbTableName}/index/*`,
                                    `arn:aws:dynamodb:${REGION}:${ACCOUNT_ID}:table/${DynamoDbTableName}`
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    ServerlessAppUnAuthRole: {
        Type: "AWS::IAM::Role",
        Properties: {
            AssumeRolePolicyDocument: {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {
                            "Federated": "cognito-identity.amazonaws.com"
                        },
                        "Action": "sts:AssumeRoleWithWebIdentity",
                        "Condition": {
                            "StringEquals": {
                                "cognito-identity.amazonaws.com:aud": {"Ref": "IdentityPool"}
                            },
                            "ForAnyValue:StringLike": {
                                "cognito-identity.amazonaws.com:amr": "unauthenticated"
                            }
                        }
                    }
                ]
            },
            "Policies": [
                {
                    "PolicyName": "TableReaderPolicy",
                    "PolicyDocument": {
                        "Version": "2012-10-17",
                        "Statement": [
                            {
                                "Sid": "VisualEditor0",
                                "Effect": "Allow",
                                "Action": [
                                    "dynamodb:BatchGetItem",
                                    "dynamodb:GetItem",
                                    "dynamodb:Scan",
                                    "dynamodb:Query",
                                ],
                                "Resource": [
                                    `arn:aws:dynamodb:${REGION}:${ACCOUNT_ID}:table/${DynamoDbTableName}/index/*`,
                                    `arn:aws:dynamodb:${REGION}:${ACCOUNT_ID}:table/${DynamoDbTableName}`
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
}

export default roles
