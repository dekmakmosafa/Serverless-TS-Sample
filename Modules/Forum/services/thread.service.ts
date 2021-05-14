import {UserInterface} from "../../../Middlewares/token.middleware";
import {CreateThreadInputParamsInterface} from "../interfaces/createThreadInputParams.interface";
import {ThreadModel} from "../../../Models/Thread.model";

export class ThreadService {

    createThread(_credentials, _user: UserInterface, _thread_body: CreateThreadInputParamsInterface) {
        const threadModel = new ThreadModel(_credentials);
        return threadModel.createThread(_user.sub, _thread_body.forum_id, _thread_body.title, _thread_body.description);
    }

    getForumThreads(_credentials, _forum_id) {
        const threadModel = new ThreadModel(_credentials);
        return threadModel.getThreadsByForumId(_forum_id);
    }

}
