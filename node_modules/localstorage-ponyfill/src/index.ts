// MIT © 2017 azu
import { LocalStoragePonyfill } from "./LocalStoragePonyfill";
import { autoSelectMode, LocalStoragePonyfillMode, LocalStoragePonyfillOptions } from "./shared";

export { LocalStoragePonyfill };

export function createLocalStorage(options: LocalStoragePonyfillOptions = {}): LocalStoragePonyfill {
    const mode = options.mode || "auto";
    const actualMode: LocalStoragePonyfillMode = mode === "auto" ? autoSelectMode() : mode;
    if (actualMode === "browser") {
        return window.localStorage;
    } else if (actualMode === "node") {
        const appRoot = require('app-root-path');
        const path = require("path");
        const LocalStorage = require('node-localstorage').LocalStorage;
        const defaultCacheDir = path.join(appRoot.toString(), ".cache");
        if (!options.storeFilePath) {
            const mkdirp = require('mkdirp');
            mkdirp.sync(defaultCacheDir)
        }
        const saveFilePath = options.storeFilePath ? options.storeFilePath : path.join(defaultCacheDir, "localstorage-ponyfill");
        return new LocalStorage(saveFilePath);
    } else if (actualMode === "memory") {
        return require("localstorage-memory");
    }
    throw new Error("Unknown mode:" + actualMode);
}
