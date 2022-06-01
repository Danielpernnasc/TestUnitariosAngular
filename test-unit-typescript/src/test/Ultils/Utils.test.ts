


// import {Utils} from '../app/Utils';

// describe('Utils test suite', () => {
//     test('first test', () => {
//         const result = Utils.toUppercase('abc');
//         expect(result).toBe('ABC');
//     });

//     beforeEach(() =>{
//         console.log('before each')
//     });

//     beforeAll(() => {
//         console.log('before All')
//     })

//     test('parse simple URL', () => {
//         const parsedUrl = Utils.parseUrl('http://localhost:8080/login');
//         expect(parsedUrl.href).toBe('http://localhost:8080/login');
//         expect(parsedUrl.port).toBe('8080');
//         expect(parsedUrl.protocol).toBe('http:');
//         expect(parsedUrl.query).toEqual({});
//     });

//     test('parse URL with query', () => {
//         const parsedUrl = Utils.parseUrl('http://localhost:8080/login?user=user&password=pass');
//         const expectedQuery = {
//             user: 'user',
//             password: 'pass'
//         }
//         expect(parsedUrl.query).toEqual(expectedQuery);
//         expect(expectedQuery).toBe(expectedQuery);
//     })
//     test('test invalid URL with arrwo function', () =>{
     
//         expect(() =>{
//             Utils.parseUrl('')
//         }).toThrowError('Empty url');
//     });
//     test.only('test invalid URL with try catch', () => {
//         try {
//             Utils.parseUrl('');

//         }catch (error) {
//             expect(error).toBeInstanceOf(Error);
//             expect(error).toHaveProperty('message', 'Empty url!');
//         }
//     });
// });



import { Utils } from '../../app/Utils/Utils'
import { IncomingMessage } from 'http';

describe('Ultils test suite', () => {
    test('getRequestPath valid request', () => {
        const request = { 
            url: 'http://localhost:8080/login'
        } as IncomingMessage;
    
        const resultPath = Utils.getRequestBasePath(request);
        expect(resultPath).toBe('login');
    });
    test('getRequestPath valid request', () => {
        const request = { 
            url: 'http://localhost:8080/'
        } as IncomingMessage;
    
        const resultPath = Utils.getRequestBasePath(request);
        expect(resultPath).toBeFalsy();
    });

    test('getRequestPath valid request', () => {
        const request = { 
            url: ''
        } as IncomingMessage;
    
        const resultPath = Utils.getRequestBasePath(request);
        expect(resultPath).toBeFalsy();
    });

});

