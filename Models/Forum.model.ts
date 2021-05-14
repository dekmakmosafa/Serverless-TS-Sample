import {Model} from "./Model";
import {v4 as uuidv4} from 'uuid';

const MODEL_NAME = 'Forum';

export interface ForumModelInterface {
    PK: string,//Forum UUID
    SK: string,//this will be a range key CreatedAt
    CreatedAt?: string,
    UpdatedAt?: string,
    CreatedBy: string
    Data: {
        title: string,
        description: string
    }
}

export class ForumModel extends Model {

    constructor(_credentials) {
        super(_credentials, MODEL_NAME);
    }

    async createForum(_userSubId, _title, _description) {

        const forumId = uuidv4();
        const createdAt = new Date().toISOString();

        const forumToCreate: ForumModelInterface = {
            PK: `${this.MODEL_NAME}#${forumId}`,
            SK: createdAt,
            CreatedBy: _userSubId,
            Data: {
                title: _title,
                description: _description
            }
        }

        try {
            await this.createItem(forumToCreate);
            return forumToCreate
        } catch (e) {
            console.log(e);
            throw e;
        }


    }

    async getALlForums() {
        const query = {
            IndexName: "Table-Index",
            KeyConditionExpression: "#04240 = :04240",
            ExpressionAttributeValues: {
                ":04240": "Forum"
            },
            ExpressionAttributeNames: {
                "#04240": "Table"
            }
        }
        return this.query(query);
    }

}
