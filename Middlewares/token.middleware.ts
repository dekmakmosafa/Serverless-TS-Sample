import {CognitoService} from "../Services/cognito.service";
import jwtDecode from "jwt-decode";

interface CredentialsInterface {
    AccessKeyId: string,
    SecretKey: string,
    SessionToken: string,
    Expiration: string,
}

export interface UserInterface {
    sub: string,
    email_verified: string,
    auth_time: string,
    name: string,
    email: string
}

export interface TokenInfoInterface {
    credentials: CredentialsInterface
    user: UserInterface,
}

const cognitoService = new CognitoService();

const getTokenInfo = async (_event) => {
    let authorization = _event.headers['Authorization'];

    if (authorization) {

        let token = authorization.split(" ")[1];
        const decodedToken: any = jwtDecode(token);

        let provider = decodedToken['iss'].split('https://');
        provider = provider[1];
        provider = provider.replace('https://', '');

        const getCredentialsRes: any = await cognitoService.getCredentialsFromTokenId(provider, token);
        const credentials: CredentialsInterface = getCredentialsRes['Credentials'];

        const tokenInfo: TokenInfoInterface = {
            credentials: credentials,
            user: decodedToken
        };

        return tokenInfo;
    } else {
        const getCredentialsRes: any = await cognitoService.getCredentialsForUnAuth();
        const credentials: CredentialsInterface = getCredentialsRes['Credentials'];

        const tokenInfo: TokenInfoInterface = {
            credentials: credentials,
            user: null
        };
        return tokenInfo;

    }


}

export {getTokenInfo}
