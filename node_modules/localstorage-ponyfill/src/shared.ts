export type LocalStoragePonyfillMode = "browser" | "node" | "memory"

export interface LocalStoragePonyfillOptions {
    // "auto" by default
    mode?: "auto" | LocalStoragePonyfillMode;
    // save file path. that is used in "node" mode
    storeFilePath?: string;
}


export const autoSelectMode = (): LocalStoragePonyfillMode => {
    if (typeof window === "object" && window.localStorage) {
        return "browser";
    } else {
        return "node";
    }
};
