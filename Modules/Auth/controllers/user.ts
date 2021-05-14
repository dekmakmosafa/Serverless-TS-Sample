import {APIGatewayProxyHandler} from "aws-lambda";
import {getResponse} from "../../../Helpers/controller.helper";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {UserRegisterInterface} from "../interfaces/user-register.interface";
import {UserService} from "../services/user.service";
import {UserLoginInterface} from "../interfaces/user-login.interface";
import {UserConfirmSignUpInterface} from "../interfaces/user-confirmSignUp.interface";

//todo:Create the user register,login,logoug flow , create te amdin create delete disable user flow

const userService = new UserService();

const login: APIGatewayProxyHandler = middy(async (_event, _context) => {

    try {
        const login_body: UserLoginInterface = _event.body.login_body;
        const res = await userService.userLogin(login_body);
        return getResponse(200, res);
    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }

    return getResponse(200, 'Login')

}).use(jsonBodyParser())

const logout: APIGatewayProxyHandler = async (event, _context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }, null, 2),
    };
}

const register: APIGatewayProxyHandler = middy(async (_event) => {

    try {
        const register_body: UserRegisterInterface = _event.body.register_body;
        const res = await userService.userSelfRegister(register_body);
        console.log(res)
        return getResponse(200, res)
    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }


}).use(jsonBodyParser());


const confirmSignUp: APIGatewayProxyHandler = middy(async (_event, _context) => {

    try {
        const confirm_signup_body: UserConfirmSignUpInterface = _event.body.confirm_sign_up_body;
        const res = await userService.userConfirmSignUp(confirm_signup_body);
        return getResponse(200, res);
    } catch (e) {
        console.log(e);
        return getResponse(400, e.message);
    }


}).use(jsonBodyParser())


export {login, logout, register, confirmSignUp}
