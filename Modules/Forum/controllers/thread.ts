import {APIGatewayProxyHandler} from "aws-lambda";
import {getResponse} from "../../../Helpers/controller.helper";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import {getTokenInfo} from "../../../Middlewares/token.middleware";
import {ThreadService} from "../services/thread.service";
import {CreateThreadInputParamsInterface} from "../interfaces/createThreadInputParams.interface";


const threadService = new ThreadService();

const createThread: APIGatewayProxyHandler = middy(async (_event, _context) => {

    try {
        const tokenInfo = await getTokenInfo(_event);
        const thread_body: CreateThreadInputParamsInterface = _event.body.thread_body;

        const res = await threadService.createThread(tokenInfo.credentials, tokenInfo.user, thread_body);
        console.log(res);
        return getResponse(200, res);

    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }

}).use(jsonBodyParser());


const getForumThreads: APIGatewayProxyHandler = middy(async (_event, _context) => {

    try {
        const forum_id = _event.pathParameters.forum_id;

        const res = await threadService.getForumThreads(null, forum_id);
        console.log(res);
        return getResponse(200, res);

    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }

}).use(jsonBodyParser());


export {createThread, getForumThreads}
