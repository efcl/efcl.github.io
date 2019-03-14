# @proofdict/tester

Test tool using proofdict.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @proofdict/tester

## Usage

```ts
const proofdict = require("./fixtures/proofdict.json");
const tester = new ProofdictTester(proofdict);
const text = "Workaound is typo.";
return tester.match(text).then(result => {
    assert.strictEqual(result.details.length, 1);
    const [detail] = result.details;
    assert.strictEqual(detail.actual, "Workaound");
    assert.strictEqual(detail.expected, "Workaround");
    assert.strictEqual(detail.matchStartIndex, 0);
    assert.strictEqual(detail.matchEndIndex, 9);
    assert.strictEqual(text.slice(detail.matchStartIndex, detail.matchEndIndex), "Workaound");
});

```

### API

```ts
import { Diff } from "prh";
export interface Proofdict {
    expected: string;
    patterns: string[];
    description: string;
    id?: string;
    specs?: ProofdictSpec[];
    tags: string[];
}
export interface ProofdictSpec {
    from: string;
    to: string;
}
export interface ProofdictTesterResultDetail {
    description?: string;
    matchStartIndex: number;
    matchEndIndex: number;
    actual: string;
    expected: string;
}
export interface ProofdictTesterResult {
    output: string;
    details: ProofdictTesterResultDetail[];
    diffs: Diff[];
}
export declare class ProofdictTester {
    constructor(proofdictData: Proofdict[]);
    replace(text: string): Promise<string>;
    match(text: string): Promise<ProofdictTesterResult>;
}
```

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
