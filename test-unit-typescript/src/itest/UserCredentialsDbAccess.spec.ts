import { UserCredentials } from './../app/Models/ServerModels';
import { UserCredentialsDbAccess } from './../app/Authorization/UserCredentialsDbAccess';

describe('User CredentialsDBAccess itest suite', () => {
    let userCredentialDbAccess: UserCredentialsDbAccess;
    let someUserCredentials: UserCredentials;
    const randomString = Math.random().toString(36).substring(7)
    
    beforeAll(() => {
        userCredentialDbAccess = new UserCredentialsDbAccess();
        someUserCredentials = {
            accessRights: [1, 2, 3],
            username: 'someUser',
            password: randomString
        }
    })
    test('should store and retrieve UserCredentials  ', async () => {
       await userCredentialDbAccess.putUserCredential(someUserCredentials);
       const resultCredentials = await userCredentialDbAccess.getUserCredential(someUserCredentials.username, someUserCredentials.password);
       expect(resultCredentials).toMatchObject(someUserCredentials);
       
    });

    test('should delete UserCrendetials', async () =>{
        await userCredentialDbAccess.deleteUserCredential(someUserCredentials);
        const resultCredentials = await userCredentialDbAccess.getUserCredential(someUserCredentials.username, someUserCredentials.password);
        expect(resultCredentials).toBeUndefined
    });

    test('delete missing userCredentials throw error', async () => {
        try {
            await userCredentialDbAccess.deleteUserCredential(someUserCredentials);
        } catch(error){
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'UserCrendentials not deleted' )
        }
    })
})
