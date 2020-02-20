'use strict';

const _ = require('lodash');
const Tokey = require('./../index.js');


describe('basic', () => {
    


    test('verify new key', () => {
        const tokey = new Tokey();
        
        let key = tokey.generate();
        expect(tokey.verify(key)).toBeTruthy();
    })
    
    test('verify outdated token', () => {
        const tokey = new Tokey();
        
        let key = tokey.generate({ date: new Date(0) });
        expect(tokey.verify(key)).toBeFalsy();
    })
    
    test('use custom key to verify 1 hour old token', () => {
        const tokey = new Tokey();
        const key = tokey.createKey({ lifetime: 60*60 });
        tokey.key = key;
        
        let pastDateValid = new Date();
        pastDateValid.setTime(pastDateValid - (60*60*1000-1000));
        
        let keyValid = tokey.generate({ date: pastDateValid });
        expect(tokey.verify(keyValid)).toBeTruthy();
        
        
        let pastDateInvalid = new Date();
        pastDateInvalid.setTime(pastDateInvalid - (60*60*1000+1000));
        
        let keyInvalid = tokey.generate({ date: pastDateInvalid });
        expect(tokey.verify(keyInvalid)).toBeFalsy();
    })
    
    // beforeAll(() => {
    //     return collector
    //         .init({
    //             args: []
    //         })
    //         .then(data => browserContext = data);
    // });
    // 
    // 
    // afterAll(() => {
    //     return collector
    //         .teardown(browserContext);
    // });


    // function checkRateResult(result, task) {
    //     expect(result.provider).toEqual(task.provider);
    //     expect(result.duration).toBeLessThan(10);
    //     expect(result.error).toBeUndefined();
    //     expect(result.rates).toBeDefined();
    // 
    //     _.each(result.rates, rateResult => {
    //         expect(rateResult).toEqual(
    //             expect.objectContaining({
    //                 name: expect.any(String),
    //                 data: expect.any(Array),
    //             })
    //         );
    // 
    //         _.each(rateResult.data, item => {
    //             expect(item).toMatchObject({
    //                 label: expect.any(String),
    //                 type: expect.any(String),
    //                 value: expect.anything(),
    //             })
    // 
    //             expect([
    //                 'bonus',
    //                 'basePrice',
    //                 'workingPrice',
    //                 'priceGuarantee',
    //                 'minimumTerm',
    //                 'extendedTerm',
    //                 'package',
    //                 'cancelationPeriod',
    //                 'monthlyPrice',
    //             ])
    //             .toContain(item.type);
    // 
    //             // check value
    //         });
    //     })
    // }
    // 
    // 
    // test.each(tasks.map(task => [task.provider]))('power search %s', (providerName) => {
    //     let tasks = [{ provider: providerName }];
    // 
    //     return collector
    //         .run(browserContext, tasks, searches.power)
    //         .then(results => {
    //             _.each(results, (result, index) => checkRateResult(result, tasks[0]));
    //         });
    // 
    // }, 15000)
    // 
    // 
    // test.each(tasks.map(task => [task.provider]))('gas search %s', (providerName) => {
    //     let tasks = [{ provider: providerName }];
    // 
    //     return collector
    //         .run(browserContext, tasks, searches.gas)
    //         .then(results => {
    //             _.each(results, (result, index) => checkRateResult(result, tasks[0]));
    //         });
    // 
    // }, 15000)
    // 
    // 
    // test.skip.each(tasks.map(task => [task.provider]))('unknown rate %s', (providerName) => {
    //     let tasks = [{ provider: providerName, rates: ['asdf'] }];
    // 
    //     return collector
    //         .run(browserContext, tasks, searches.power)
    //         .then(results => {
    //             _.each(results, (result, index) => {
    //                 expect(result.provider).toEqual(tasks[index].provider);
    //                 expect(result.duration).toBeLessThan(10);
    //                 expect(result.error).toBeUndefined();
    //                 expect(result.rates).toBeDefined();
    //             });
    //         });
    // }, 15000);
})
