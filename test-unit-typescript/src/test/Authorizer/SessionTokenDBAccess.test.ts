

import { SessionToken } from '../../app/Models/ServerModels';
import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess';
import * as Nedb from 'nedb';

describe('test suite SessionTokenDBAccess', () => {
    let sessionTokenDBAccess: SessionTokenDBAccess
    const nedbMock = {
        loadDatabase: jest.fn(),
        insert: jest.fn(),
        find: jest.fn(),
        remove:jest.fn()    
    }

    const someToken: SessionToken = {
        accessRights: [],
        expirationTime: new Date(),
        tokenId: '',
        userName: '',
        valid: true
    }

    const someTokenId = '';

    beforeEach(()=>{
        sessionTokenDBAccess = new SessionTokenDBAccess(nedbMock as any);
        expect(nedbMock.loadDatabase).toBeCalled();
    });

    afterEach(() => {
        jest.clearAllMocks()
    });

    test('store SessionToken without error', async () => {
        nedbMock.insert.mockImplementation(
            (someToken: any, cb: any) => {
                cb()
            }
        );
        await sessionTokenDBAccess.storeSessionToken(someToken);
        expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));

    });

    test('store SessionToken without error', async () => {
        nedbMock.insert.mockImplementation(
            (someToken: any, cb: any) => {
                cb(new Error ('Algo deu errado'))
            }
        );
        await expect(sessionTokenDBAccess.storeSessionToken(someToken))
            .rejects.toThrow('Algo deu errado');
        expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function))
      

    });

    test('getToken find withou error', async () => {
        nedbMock.find.mockImplementation(
            (someTokenId: any, cd: any) => {
               cd(null, [someToken])
            }
        );
        await sessionTokenDBAccess.getToken(someTokenId);
        expect(nedbMock.find).toBeCalledWith({tokenId: someTokenId}, expect.any(Function))
    
    });

    test('getToken find withou error', async () => {
        nedbMock.find.mockImplementation(
            (someTokenId: any, cd: any) => {
               cd(new Error ('Algo deu errado'))
            }
        );
        await expect(sessionTokenDBAccess.getToken(someTokenId))
            .rejects.toThrow('Algo deu errado')
        expect(nedbMock.find).toBeCalledWith({tokenId: someTokenId}, expect.any(Function))
    
    });

    test('getToken find withou error', async () => {
       const bar = (someTokenId: string, cb: any) => {
           cb(null, [])
       }
       nedbMock.find.mockImplementationOnce(bar)
       const getTokenResult = await sessionTokenDBAccess.getToken(someTokenId)
       expect(getTokenResult).toBeNull;
       expect(nedbMock.find).toBeCalledWith({tokenId: someTokenId}, expect.any(Function))
    });




  
})