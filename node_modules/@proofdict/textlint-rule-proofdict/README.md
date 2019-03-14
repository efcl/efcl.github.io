# @proofdict/textlint-rule-proofdict

[textlint](https://github.com/textlint/textlint "textlint") rule check text using [proofdict](https://proofdict.github.io/proofdict/ "proofdict").

[proofdict](https://proofdict.github.io/proofdict/ "proofdict") is a opinionated dictionary. 

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @proofdict/textlint-rule-proofdict

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "@proofdict/proofdict": {
          "dictURL": "https://azu.github.io/proof-dictionary/"
        }
    }
}
```

Via CLI

```
textlint --rule proofdict README.md
```

## Options

```json5
{
    // If you want to use live-proofdict
    // Proofdict-style dictionary URL
    // Example: "https://azu.github.io/proofdict/"
    // If you want to specific JSON end point, please pass object.
    // `dictURL; { jsonAPI: string, ruleBase: string }`
    "dictURL": undefined,
    // If you want to use local proofdict
    // dictPath is glob style path
    // TODO: Not implement yet
    "dictPath": undefined,
    // Default: 60sec(60 * 1000ms)
    "autoUpdateInterval": 60 * 1000,
    // = Tag settings
    // Filter dictionary by whitelist or blacklist
    // Default: Enable all terms of the dictionary.
    // When set both options, this rule prefer whitelist to blacklist
    "whitelistTags": [],
    "blacklistTags": [],
};
```

### `dictURL`

`dictURL` is required option.
You must set your dictionary website url.

For example, set `https://azu.github.io/proof-dictionary/` to `dictURL`.
This url fetch dictionary data from `https://azu.github.io/proof-dictionary/dictionary.json`.

If you want to custom API end point, pass object instead of string.

```json5.
"dictURL": { 
   "jsonAPI": "https://azu.github.io/proof-dictionary/custom-dict.json",
   "ruleBase": "https://azu.github.io/proof-dictionary/item/",
}
``` 

### Whitelist/Blacklist

This rule use [proofdict](https://proofdict.github.io/proofdict/ "proofdict") as the source of dictionary.

Each dictionary items has `tag`.

For example, [WebKit](https://proofdict.github.io/proofdict/item/01BQ92YZ6QR8RJKA5Y8W2F9NMY "WebKit") has `noun` tag.

You can setting enable/disable by `whitelistTags` and `blacklistTags`

e.g.) Enable only "noun" tag.

```json
{
    "rules": {
        "@proofdict/proofdict": {
          "whitelistTags": ["noun"]
        }
    }
}
```

e.g.) Use items without `"opinion"` tag

```json
{
    "rules": {
        "@proofdict/proofdict": {
          "blacklistTags": ["opinion"]
        }
    }
}
```


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
