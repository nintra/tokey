# Tokey
- generate a key and use it on all peers
- now generate a token on the sending peer
- verify the token on the receiving end

```javascript
/* new instance, you can pass a key or a new one will be created
    key: 
    - lifetime
    - contentOffset
    - randomStringLength
    - mix
*/
let tokey = new Tokey(key);

/* create a custom key
    options:
    - lifetime (int) duration in seconds a token is valid
    - contentOffset (int) char-code offset for obfuscating the string
    - randomStringLength (int) length of random characters added to the content string
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
