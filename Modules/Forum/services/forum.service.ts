import {CreateForumInputParamsInterface} from "../interfaces/createForumInputParams.interface";
import {ForumModel} from "../../../Models/Forum.model";
import {UserInterface} from "../../../Middlewares/token.middleware";

export class ForumService {

    createForum(_credentials, _user: UserInterface, _form_body: CreateForumInputParamsInterface) {
        const forumModel = new ForumModel(_credentials);
        return forumModel.createForum(_user.sub, _form_body.title, _form_body.description);
    }

    getALlForums(_credentials) {
        const forumModel = new ForumModel(_credentials);
        return forumModel.getALlForums();
    }

}
