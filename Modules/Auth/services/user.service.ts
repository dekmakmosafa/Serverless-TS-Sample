import {UserRegisterInterface} from "../interfaces/user-register.interface";
import {CognitoService} from "../../../Services/cognito.service";
import {UserLoginInterface} from "../interfaces/user-login.interface";
import {AuthFlowEnums} from "../enums/authFlow.enums";
import {UserConfirmSignUpInterface} from "../interfaces/user-confirmSignUp.interface";

const cognitoService = new CognitoService();

export class UserService {


    userSelfRegister(_register_body: UserRegisterInterface) {
        return cognitoService.register(_register_body);
    }

    userLogin(_login_body: UserLoginInterface) {
        return cognitoService.initaiteAuth(AuthFlowEnums.USER_PASSWORD_AUTH, _login_body.username, _login_body.password);
    }

    userConfirmSignUp(_confirm_signup_body: UserConfirmSignUpInterface) {
        return cognitoService.userConfirmSignUp(_confirm_signup_body.verification_code, _confirm_signup_body.username);
    }

}
