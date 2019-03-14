# textlint-rule-no-start-duplicated-conjunction [![Build Status](https://travis-ci.org/textlint-rule/textlint-rule-no-start-duplicated-conjunction.svg?branch=master)](https://travis-ci.org/textlint-rule/textlint-rule-no-start-duplicated-conjunction)

[textlint](https://github.com/textlint-rule/textlint "textlint") rule that check no start with duplicated conjunction.

## Installation

    npm install textlint-rule-no-start-duplicated-conjunction

## Usage

    npm install -g textlint textlint-rule-no-start-duplicated-conjunction
    textlint --rule no-start-duplicated-conjunction README.md
    
## Config

```json5
{
    "rules": {
        "no-start-duplicated-conjunction": {
            "interval" : 2 // interval of sentences
        }
    }
}
```

## Example

```
But, A is ~.
So, A is ~.
But, A is ~.
```
(interval<=2)

This rule report Error => "don't repeat "But" in 2 phrases"

### Exception

Ignore following link nodes:


```markdown
[import, a.js](a.js)
[import, b.js](b.js)
```

No error


## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

## Reference

- [[022388]文頭の接続詞の連続や、文末の表記の連続などをチェックする](http://support.justsystems.com/faq/1032/app/servlet/qadoc?QID=022388 "[022388]文頭の接続詞の連続や、文末の表記の連続などをチェックする")
