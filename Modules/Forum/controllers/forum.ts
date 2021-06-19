import {APIGatewayProxyHandler} from "aws-lambda";
import {getResponse} from "../../../Helpers/controller.helper";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import {getTokenInfo} from "../../../Middlewares/token.middleware";
import {CreateForumInputParamsInterface} from "../interfaces/createForumInputParams.interface";
import {ForumService} from "../services/forum.service";
import {createForumInputSchema} from "../schemas/createForumInputSchema";
import {BodyValidationUtil} from "../../../Utils/body_validation.util";

const forumService = new ForumService();
const bodyValidationUtil = new BodyValidationUtil()

const createForum: APIGatewayProxyHandler = middy(async (_event, _context) => {

    try {
        const tokenInfo = await getTokenInfo(_event);

        const forum_body: CreateForumInputParamsInterface = _event.body.forum_body;

        bodyValidationUtil.validateInput(createForumInputSchema, forum_body);

        const res = await forumService.createForum(tokenInfo.credentials, tokenInfo.user, forum_body);

        return getResponse(200, res);
    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }

}).use(jsonBodyParser());

const getAllForums: APIGatewayProxyHandler = middy(async (_event, _context) => {

    try {
        const tokenInfo = await getTokenInfo(_event);
        const res = await forumService.getALlForums(tokenInfo.credentials);
        return getResponse(200, res);
    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }

}).use(jsonBodyParser());


export {createForum, getAllForums}
