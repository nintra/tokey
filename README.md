# Tokey
Simple time-based token generator to hinder unwanted server requests.

- generates a token based on the current time 
- randomizes it based on a `key`
- provide the same `key` on all peers to allow generation and verification


```javascript
/* new instance, you can pass a key or a new one will be created */
let tokey = new Tokey(key)

/* create a custom key (the 'mix' property will be generated)
    options:
    - lifetime (int) duration in seconds a token is valid, default: 30
    - contentOffset (int) char-code offset for obfuscating the string, default: random
    - randomStringLength (int) length of random characters added to the content string, default: 26
    
    returns an object with these `options` and adds the `mix` property 
    - mix (array) positions for mixing the string    
*/
let key = tokey.createKey(options)

/* generate a time-based token
    options:
    - date (date) date of the token, default: now
*/
let token = tokey.generate(options)

/* check if token is valid and not outdated
    token (string)
*/
let result = tokey.verify(token)
```
