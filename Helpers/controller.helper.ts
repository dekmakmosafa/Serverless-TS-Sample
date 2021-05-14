
const getResponse = (_statusCode,_message) => {
    if(_message=="Cannot read property 'AccessKeyId' of undefined")
    {
        _message='un authorized';
        _statusCode=401
    }
    return {
        statusCode: _statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(_message),
    };
}

export {getResponse}
