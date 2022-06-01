import { rejects } from 'assert';
import { UserCredentialsDbAccess } from './../../app/Authorization/UserCredentialsDbAccess';
import { UserCredentials } from './../../app/Models/ServerModels';

jest.mock('nedb')


describe('UserCredentialsDbAccess test suite', () => {

    let userCredentialsDBAccess: UserCredentialsDbAccess;
    const nedbMock = {
        loadDatabase: jest.fn(),
        insert: jest.fn(),
        find: jest.fn()
    }

    const someuser: UserCredentials ={
        username: 'someUserName',
        password: 'somePassword',
        accessRights: [1, 2, 3]
    }
    beforeAll(() => {
        userCredentialsDBAccess = new UserCredentialsDbAccess(nedbMock as any)
        expect(nedbMock.loadDatabase).toBeCalled();
    });
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('put user credentials with no error', async () => {
      nedbMock.insert.mockImplementation(
          (someuser: any, cb: any) => {
              cb()
          }
        );
        await userCredentialsDBAccess.putUserCredential(someuser);
        expect(nedbMock.insert).toBeCalledWith(someuser, expect.any(Function))
    });

    test('put user credentials with no error', async () => {
      nedbMock.insert.mockImplementation(
          (someuser: any, cb: any) => {
              cb(new Error ('Algo deu errado'))
          }
        );
        await expect(userCredentialsDBAccess.putUserCredential(someuser))
          .rejects.toThrow('Algo deu errado')
        expect(nedbMock.insert).toBeCalledWith(someuser, expect.any(Function))
    });
    test('getUserCredentials with no error', async () => {
        nedbMock.find.mockImplementation( 
            (someUsers: any, cb: any) => {
            cb(null, [someuser])
        }
        );
        const getUserCredentialsResult = await userCredentialsDBAccess.getUserCredential('someUserName', 'somePassword');
        expect(getUserCredentialsResult).toBe(someuser);
       
    });

    test('getUserCredentials with no error', async () => {
        nedbMock.find.mockImplementation( 
            (someUsers: any, cb: any) => {
            cb(null, [])
        }
        );
        const getUserCredentialsResult = await userCredentialsDBAccess.getUserCredential('someUserName', 'somePassword');
        expect(getUserCredentialsResult).toBeNull;
       
    });
    
    test('getUserCredentials with no error', async () => {
        nedbMock.find.mockImplementation( 
            (someUsers: any, cb: any) => {
            cb(new Error ('Algo deu errado'))
        }
        );
        await expect(userCredentialsDBAccess.getUserCredential('someUserName', 'somePassword'))
        .rejects.toThrow('Algo deu errado')
       
    });

})