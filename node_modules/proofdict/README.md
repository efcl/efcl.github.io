# Proofdict [![Build Status](https://travis-ci.org/proofdict/proofdict.svg?branch=master)](https://travis-ci.org/proofdict/proofdict)

Proofdict is a collection of dictionary.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install proofdict

## Website

Visit <https://proofdict.github.io/>

## Dictionary format

```yml
# `id` is unique string
id: 01BQ92YYBEFBXEHH8T8HC8RCRD
# `description` is a short comment
description: 'Reference https://www.ecma-international.org/publications/standards/Ecma-262.htm'
# `expected` is expected result
# `$1` ... `$9` reference `patterns`'s capture word
# This is same behavior with RegExp https://github.com/zeeshanu/learn-regex 
expected: ECMAScript $1
# `patterns` are match string or RegExp
# RegExp should be started with `/` and be ended with `/`
# Also, can use `()` for capturing
patterns:
  - /ECMAScript([0-9]+)/i
  - /ECMA Script([0-9]+)/i
# `specs` are test cases
# `specs[n].from` is actual word
# `specs[n].to` is expected word that is replaced result
specs:
  - from: ECMASCRIPT5
    to: ECMAScript 5
# `tags` are keywords
# Some `tag` means special meaning
tags:
  - noun
  - JavaScript
```

### Special `tag`

Some `tag` means special meaning

> `noun`

`noun` needs strict match because idiom is not same meaning the noun.

Example: `WebKit`

Generally, `/webkit/i` match `node-webkit`, but that dict is not match `node-webkit`.
Because, The dict has `noun` tag.

Steps:

1. `/webkit/i` match the text *1
2. If `/[-\w]webkit/i` or `/webkit[-\w]/i` also match the text, ignore this*1 

```yaml
id: 01BQ92YZ6QR8RJKA5Y8W2F9NMY
description: 'Reference https://webkit.org/'
expected: WebKit
patterns:
  - /webkit/i
specs:
  - from: This is webkit
    to: This is WebKit
  - from: XXXwebkit
    to: XXXwebkit
  - from: node-webkit
    to: node-webkit
tags:
  - noun
```

> `opinion`

`opinion` is opinion dictionary.

## API

Get the dictionary as JSON

- <https://proofdict.github.io/dict.json>

## Node module

    const { getProofdict, fetchProofdict} = require("proofdict");
    // get local dictionary data.
    console.log(getProofdict());
    /*
    [
        {
            "id": "01BQ92YYBJQ3A865VJ3ASRPCHB",
            "description": "",
            "expected": ".js $1",
            "patterns": [
                "/.js([.0-9]+)/"
            ],
            "specs": [],
            "tags": [
                "JavaScript"
            ]
        },
        ...
    ]
    */
    
    // fetch latest dictionary data from https://proofdict.github.io/proofdict/dict.json
    fetchProofdict().then(dictionaries => { 
        console.log(dictionaries)
    });
       

## Changelog

See [Releases page](https://github.com/proofdict/proofdict/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/proofdict/proofdict/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
