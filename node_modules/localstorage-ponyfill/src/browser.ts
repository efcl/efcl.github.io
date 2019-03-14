// MIT © 2018 azu
import { LocalStoragePonyfill } from "./LocalStoragePonyfill";
import { autoSelectMode, LocalStoragePonyfillMode, LocalStoragePonyfillOptions } from "./shared";

export { LocalStoragePonyfill };

export function createLocalStorage(options: LocalStoragePonyfillOptions = {}): LocalStoragePonyfill {
    const mode = options.mode || "auto";
    const actualMode: LocalStoragePonyfillMode = mode === "auto" ? autoSelectMode() : mode;
    if (actualMode === "browser") {
        return window.localStorage;
    } else if (actualMode === "node") {
        throw new Error(`Can not select "node" mode in browser`);
    } else if (actualMode === "memory") {
        return require("localstorage-memory");
    }
    throw new Error("Unknown mode:" + actualMode);
}
