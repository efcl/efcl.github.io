# textlint-util-to-string

Convert `Paragraph` Node to plain text with SourceMap.

SourceMap mean that could revert `position` in plain text to `position` in Node.

This library is for [textlint](https://github.com/textlint/textlint "textlint") and [textstat](https://github.com/azu/textstat "textstat").

## Installation

    npm install textlint-util-to-string

## Usage

### `Constructor(rootNode): source`

Return instance of Source.

## `originalIndexFromIndex(generatedIndex): number`

get original index from generated index value

## `originalPositionFromPosition(position): original`

get original position from generated position

## `originalIndexFromPosition(generatedPosition): number`

get original index from generated position

## `originalPositionFromIndex(generatedIndex): Position`

get original position from generated index

```js
import assert from "power-assert"
import {parse} from "markdown-to-ast";
import StringSource from "textlint-util-to-string";

let originalText = "This is [Example！？](http://example.com/)";
let AST = parse(originalText);
let source = new StringSource(AST);
let result = source.toString();
assert.equal(result, "This is Example！？");
let index1 = result.indexOf("Example");
assert.equal(index1, 8);
// 8 -> 9
// originalText[9];// "E"
assert.equal(source.originalIndexFor(index1), 9);
assert.deepEqual(source.originalPositionFor({
    line: 1,
    column:8
}), {
    line: 1,
    column: 9
);
let index2 = result.indexOf("！？");
assert.equal(index2, 15);
// 15 -> 16
// originalText[16];// "！"
assert.equal(source.originalIndexFor(index2), 16);
```

## FAQ

### Why return relative position from rootNode?

```js
let AST = ....
let rootNode = AST.children[10];
let source = new StringSource(rootNode);
source.originalIndexFor(0); // should be 0
```

To return relative position easy to compute position(We think).

One space has a single absolute position, The other should be relative position.

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