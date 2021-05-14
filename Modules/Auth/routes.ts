const routePath = 'Modules/Auth/controllers/';

const AuthRoutes = {

    userLogin: {
        handler: `${routePath}/user.login`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'auth/login',
                    cors: true
                }
            }
        ]
    },

    userRegister: {
        handler: `${routePath}/user.register`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'auth/register',
                    cors: true
                }
            }
        ]
    },

    userConfirmSignUp: {
        handler: `${routePath}/user.confirmSignUp`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'auth/confirm',
                    cors: true
                }
            }
        ]
    },


}

export default AuthRoutes
