
const RoleMapping = {
    IdentityPoolRoleMapping: {
        Type: "AWS::Cognito::IdentityPoolRoleAttachment",
        Properties: {
            IdentityPoolId: {"Ref": "IdentityPool"},
            "Roles": {
                "authenticated": {
                    "Fn::GetAtt": [
                        "ServerlessAppAuthRole",
                        "Arn"
                    ]
                },
                "unauthenticated": {
                    "Fn::GetAtt": [
                        "ServerlessAppUnAuthRole",
                        "Arn"
                    ]
                }
            }
        }
    }
}

export default RoleMapping
