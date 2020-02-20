'use strict';

const _ = require('lodash');


module.exports = Tokey;
function Tokey(key) {
    let self = this;    
        
    self.dateStringLength = 14;
    self.key = key || self.createKey();    
}

Tokey.prototype.createKey = function createKey(options = {}) {
    let self = this;
    let key = {};
    
    // seconds
    key.lifetime = options.lifetime || 30;    
    
    // 0=48, 9=57, A=65, Z=90, a=97, z=122
    key.contentOffset = options.contentOffset || (!!_.random(0, 1) ? _.random(17, 33) : _.random(49, 65)); 
    
    key.randomStringLength = options.randomStringLength || 26;
    
    key.mix = [];
    for(let i=0; i < (self.dateStringLength + key.randomStringLength); i++) {
        key.mix.push(i);
    }
    key.mix = _.shuffle(key.mix);
    
    self.key = key;
    return key;
}

Tokey.prototype.generate = function(options = {}) {
    let self = this; 
        
    let date = options.date || new Date();    
    
    let dateParts = {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
    };
    let dateString = _.map(dateParts, p => _.padStart(p, 2, '0')).join('');
    
    // offset content
    dateString = _.map(dateString, s => String.fromCharCode(s.charCodeAt(0) + self.key.contentOffset)).join('')
    
    let randomString = '';
    let randomStringSource = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let i=0; i<self.key.randomStringLength;i++) {
        randomString += randomStringSource.substr(_.random(0, randomStringSource.length-1), 1);
    }    
    
    let combinedString = dateString + randomString;
    
    let mixed = _.map(self.key.mix, pos => combinedString[pos]).join('');
    
    return mixed;
}

Tokey.prototype.verify = function(token) {  
    let self = this;
    
    if (typeof(token) !== 'string' || token.length !== (self.dateStringLength + self.key.randomStringLength)) {
        return false;
    }
    
    let unmixed = _.map(self.key.mix, (pos, index) => 
        token[self.key.mix.indexOf(index)]
    ).join('');
    
    let dateString = unmixed.substr(0, unmixed.length - self.key.randomStringLength);
        
    dateString = _.map(dateString, s => 
        String.fromCharCode(s.charCodeAt(0) - self.key.contentOffset)
    ).join('');
    
    let date = new Date(
        Date.UTC(
            _.parseInt(dateString.substr(0, 4)),
            _.parseInt(dateString.substr(4, 2))-1,
            _.parseInt(dateString.substr(6, 2)),
            _.parseInt(dateString.substr(8, 2)),
            _.parseInt(dateString.substr(10, 2)),
            _.parseInt(dateString.substr(12, 2)),
        )
    );
    
    let diffSeconds = ((new Date()) - date) / 1000;
    return diffSeconds <= self.key.lifetime;
}