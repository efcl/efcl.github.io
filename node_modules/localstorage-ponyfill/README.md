# localstorage-ponyfill [![Build Status](https://travis-ci.org/azu/localstorage-ponyfill.svg?branch=master)](https://travis-ci.org/azu/localstorage-ponyfill)


Universal LocalStorage ponyfill library for browser and Node.js.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install localstorage-ponyfill

## Usage

### Auto(Browser or Node.js)

Automatically select mode.

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage();
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
assert.strictEqual(value, "value");        
```

### Browser

Native localStorage.

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "browser" });
```

### Node.js

Use [node-localstorage](https://github.com/lmaccherone/node-localstorage "node-localstorage")

Store data to `<app-root>/.cache/localstorage-ponyfill/*` by default.
You can setting the path by `storeFilePath` option.

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "node" });
```

### In memory

Use [localstorage-memory](https://github.com/gr2m/localstorage-memory "localstorage-memory")

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "memory" });
```

## API

Same with [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

```ts
export interface LocalStoragePonyfill {
    readonly length: number;

    clear(): void;

    getItem(key: string): string | null;

    key(index: number): string | null;

    removeItem(key: string): void;

    setItem(key: string, data: string): void;

    [key: string]: any;

    [index: number]: string;
}

```

## Changelog

See [Releases page](https://github.com/azu/localstorage-ponyfill/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/localstorage-ponyfill/issues).

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
