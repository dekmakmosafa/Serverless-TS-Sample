import * as AWS from 'aws-sdk'

export class Model {

    docClient;
    TABLE_NAME = 'BLogAppTable';
    MODEL_NAME;

    constructor(_credentials, _modelName) {

        if (_credentials) {
            const creds = {
                accessKeyId: _credentials['AccessKeyId'],
                secretAccessKey: _credentials['SecretKey'],
                sessionToken: _credentials['SessionToken'],
            };
            AWS.config.credentials = creds;
        }
        this.docClient = new AWS.DynamoDB.DocumentClient();


        this.MODEL_NAME = _modelName;

    }

    async createItem(_item: any) {

        const createdAt = new Date().toISOString();
        _item['CreatedAt'] = createdAt;
        _item['UpdatedAt'] = createdAt;
        _item['Table'] = this.MODEL_NAME;

        const params = {
            Item: _item,
            TableName: `${this.TABLE_NAME}`
        };

        return this.docClient.put(params).promise();
    }

    query(_query) {
        _query['TableName'] = this.TABLE_NAME;
        console.log(_query);
        return this.docClient.query(_query).promise();
    }

    getModelName() {
        return this.MODEL_NAME;
    }


}
