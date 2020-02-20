'use strict';

const _ = require('lodash');
const Tokey = require('./../index.js');


describe('basic', () => {

    test('verify new key', () => {
        const tokey = new Tokey();
        
        let token = tokey.generate();
        expect(tokey.verify(token)).toBeTruthy();
    })
    
    test('verify outdated token', () => {
        const tokey = new Tokey();
        
        let token = tokey.generate({ date: new Date(0) });
        expect(tokey.verify(token)).toBeFalsy();
    })
    
    test('use custom key to verify 1 hour old token', () => {
        const tokey = new Tokey();
        const key = tokey.createKey({ lifetime: 60*60 });
        
        let pastDateValid = new Date();
        pastDateValid.setTime(pastDateValid - (60*60*1000-1000));
        
        let tokenValid = tokey.generate({ date: pastDateValid });
        expect(tokey.verify(tokenValid)).toBeTruthy();
        
        
        let pastDateInvalid = new Date();
        pastDateInvalid.setTime(pastDateInvalid - (60*60*1000+1000));
        
        let tokenInvalid = tokey.generate({ date: pastDateInvalid });
        expect(tokey.verify(tokenInvalid)).toBeFalsy();
    })
    
    test('not a token', () => {
        const tokey = new Tokey();
        
        expect(tokey.verify('asdf')).toBeFalsy();
        expect(tokey.verify({ a:5 })).toBeFalsy();
        expect(tokey.verify(1233)).toBeFalsy();
        expect(tokey.verify(function(){})).toBeFalsy();
    })
    
})
