import {DynamoDbTableName} from "../configs/app_infastructure.config";

const DynamoDbTable = {
    [DynamoDbTableName]: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            AttributeDefinitions: [
                {
                    "AttributeName": "PK",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "SK",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "Table",
                    "AttributeType": "S"
                },
            ],
            KeySchema: [
                {
                    "AttributeName": "PK",
                    "KeyType": "HASH"
                }
            ],
            ProvisionedThroughput: {
                "ReadCapacityUnits": "1",
                "WriteCapacityUnits": "1"
            },
            TableName: DynamoDbTableName,
            GlobalSecondaryIndexes: [
                {
                    IndexName: "PK-SK-Index",
                    KeySchema: [
                        {
                            "AttributeName": "PK",
                            "KeyType": "HASH"
                        },
                        {
                            "AttributeName": "SK",
                            "KeyType": "RANGE"
                        }
                    ],
                    Projection: {
                        "ProjectionType": "ALL"
                    },
                    ProvisionedThroughput: {
                        "ReadCapacityUnits": "1",
                        "WriteCapacityUnits": "1"
                    }
                },
                {
                    IndexName: "SK-PK-Index",
                    KeySchema: [
                        {
                            "AttributeName": "SK",
                            "KeyType": "HASH"
                        },
                        {
                            "AttributeName": "PK",
                            "KeyType": "RANGE"
                        }
                    ],
                    Projection: {
                        "ProjectionType": "ALL"
                    },
                    ProvisionedThroughput: {
                        "ReadCapacityUnits": "1",
                        "WriteCapacityUnits": "1"
                    }
                },
                {
                    IndexName: "Table-Index",
                    KeySchema: [
                        {
                            "AttributeName": "Table",
                            "KeyType": "HASH"
                        }
                    ],
                    Projection: {
                        "ProjectionType": "ALL"
                    },
                    ProvisionedThroughput: {
                        "ReadCapacityUnits": "1",
                        "WriteCapacityUnits": "1"
                    }
                },
            ],
        }
    }
}

export default DynamoDbTable;
