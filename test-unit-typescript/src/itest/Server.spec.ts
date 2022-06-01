import { UserCredentialsDbAccess } from './../app/Authorization/UserCredentialsDbAccess';

import * as axios from 'axios';
import { HTTP_CODES, SessionToken, UserCredentials } from '../app/Models/ServerModels';

axios.default.defaults.validateStatus = function () {
    return true;
}
const serverUrl = 'http://localhost:8080';

const itestUserCredentials: UserCredentials = {
    accessRights: [1,2,3],
    password: 'iTestPassword',
    username: 'iTestUser'
}

describe('Server itest suite', () => {
    let userCredentialsDBAccess: UserCredentialsDbAccess;
    let sessionToken: SessionToken
    beforeAll(() => {
        userCredentialsDBAccess = new UserCredentialsDbAccess();

    })

    test('server reachable', async () => {
        const response = await axios.default.options(serverUrl);
        expect(response.status).toBe(HTTP_CODES.OK);
    });

    test.skip('put credentials inside database', async () => {
        await userCredentialsDBAccess.putUserCredential(itestUserCredentials)
    });

    test('reject inavlid credentials ', async () => {
        const response = await axios.default.post(
            (serverUrl + '/login'),
            {
                "username": "someWrongCred",
                "password": "SomeWrongCred"
                
            }
        );
        expect(response.status).toBe(HTTP_CODES.NOT_fOUND);
    });

    test('ogin successfull with correct credentials ', async () => {
        const response = await axios.default.post(
            (serverUrl + '/login'),
            {
            
                "username": itestUserCredentials.username,
                "password": itestUserCredentials.password
            }
        );
        expect(response.status).toBe(HTTP_CODES.CREATED);
        sessionToken = response.data;
    });
    test('Query data',async ()  => {
        const response = await axios.default.get(
            (serverUrl + '/users?name=some'), {
                headers: {
                    Authorization: sessionToken.tokenId
                }
            }
        );
        expect(response.status).toBe(HTTP_CODES.OK)
    });

    test('Query data with invalid token',async ()  => {
        const response = await axios.default.get(
            (serverUrl + '/users?name=some'), {
                headers: {
                    Authorization: sessionToken.tokenId + 'someStuff'
                }
            }
        );
        expect(response.status).toBe(HTTP_CODES.UNAUTHORIZED)
    });
});

