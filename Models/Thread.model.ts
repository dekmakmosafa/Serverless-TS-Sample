import {Model} from "./Model";
import {v4 as uuidv4} from 'uuid';
import {ForumModel} from "./Forum.model";

const MODEL_NAME = 'Thread';

export interface ThreadModelInterface {
    PK: string,//Thread UUID
    SK: string,//this will be Forum Id Related
    CreatedAt?: string,
    UpdatedAt?: string,
    CreatedBy: string,
    Data: {
        title: string,
        description: string
    }
}

export class ThreadModel extends Model {

    constructor(_credentials) {
        super(_credentials, MODEL_NAME);
    }

    async createThread(_userSubId, _forumId, _title, _description) {
        const forumModel = new ForumModel(null);
        const threadId = uuidv4();

        const threadToCreate: ThreadModelInterface = {
            PK: `${this.MODEL_NAME}#${threadId}`,
            SK: `${forumModel.getModelName()}#${_forumId}`,
            CreatedBy: _userSubId,
            Data: {
                title: _title,
                description: _description
            }
        }

        try {
            await this.createItem(threadToCreate);
            return threadToCreate;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    async getThreadsByForumId(_formId) {

        const forumModel = new ForumModel(null);

        const query = {
            IndexName: "SK-PK-Index",
            KeyConditionExpression: "#cd420 = :cd420 And begins_with(#cd421, :cd421)",
            ExpressionAttributeValues: {
                ":cd420": `${forumModel.getModelName()}#${_formId}`,
                ":cd421": `${this.MODEL_NAME}#`
            },
            ExpressionAttributeNames: {
                "#cd420": "SK",
                "#cd421": "PK"
            }
        }

        return this.query(query);

    }
}
