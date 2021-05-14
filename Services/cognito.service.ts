import * as AWS from 'aws-sdk';
import {UserRegisterInterface} from "../Modules/Auth/interfaces/user-register.interface";
import {CLIENT_ID, IDENTITY_POOL_ID} from "../configs/app_infastructure.config";

const cogntioService = new AWS.CognitoIdentityServiceProvider();
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const cognitoidentity = new AWS.CognitoIdentity();


export class CognitoService {


    async initaiteAuth(_authFLow, _userName: string, _password: string) {

        const authParams = {
            AuthFlow: _authFLow,
            ClientId: CLIENT_ID,
            AuthParameters: {
                USERNAME: _userName,
                PASSWORD: _password,
            },
        };

        const resInitAuth = await cogntioService.initiateAuth(authParams).promise();
        return resInitAuth;

    }


    async getCredentialsForUnAuth() {
        const params = {
            IdentityPoolId: IDENTITY_POOL_ID,
        };
        const idRes = await cognitoidentity.getId(params).promise();
        const identityId = idRes['IdentityId'];


        const getCredentialsForIdentityParams = {
            IdentityId: identityId, /* required */
        };

        return cognitoidentity.getCredentialsForIdentity(getCredentialsForIdentityParams).promise();

    }

    async getCredentialsFromTokenId(_provider, _idToken) {

        const params = {
            IdentityPoolId: IDENTITY_POOL_ID,
            Logins: {
                [_provider]: _idToken,
            }
        };
        const idRes = await cognitoidentity.getId(params).promise();
        const identityId = idRes['IdentityId'];

        const getCredentialsForIdentityParams = {
            IdentityId: identityId, /* required */
            Logins: {
                [_provider]: _idToken,
            }
        };

        return cognitoidentity.getCredentialsForIdentity(getCredentialsForIdentityParams).promise();
    }

    async userConfirmSignUp(_confirmation_code: string, _username: string) {

        const params = {
            ClientId: CLIENT_ID, /* required */
            ConfirmationCode: _confirmation_code, /* required */
            Username: _username, /* required */
        };

        return cogntioService.confirmSignUp(params).promise();
    }

    async register(_register_body: UserRegisterInterface) {
        const params = {
            ClientId: CLIENT_ID, /* required */
            Password: _register_body.password, /* required */
            Username: _register_body.username, /* required */

            UserAttributes: [
                {
                    Name: 'email', /* required */
                    Value: _register_body.email
                },
                {
                    Name: 'name', /* required */
                    Value: _register_body.name
                },
            ],
        };

        return cognitoidentityserviceprovider.signUp(params).promise();
    }


}
