// MIT © 2017 azu

// TODO: copy
import { concat, parseRegExpString } from "prh/lib/utils/regexp";

export const wrapWordBoundaryToString = (pattern: string): string => {
    const regExp = parseRegExpString(pattern);
    if (regExp === null) {
        return pattern;
    }
    const wrapWordPattern = wrapWordBoundary(regExp);
    return wrapWordPattern.toString();
};
export const wrapWordBoundary = (pattern: string | RegExp) => {
    let result;
    let flags;
    if (typeof pattern === "string") {
        result = pattern;
    } else if (pattern instanceof RegExp) {
        result = pattern.source;
        flags = pattern.flags;
    } else {
        throw new Error(`unknown type: ${pattern}`);
    }
    return concat(["\\b", result, "\\b"], flags);
};
export const wrapHyphenWordBoundary = (pattern: string | RegExp) => {
    let result;
    let flags;
    if (typeof pattern === "string") {
        result = pattern;
    } else if (pattern instanceof RegExp) {
        result = pattern.source;
        flags = pattern.flags;
    } else {
        throw new Error(`unknown type: ${pattern}`);
    }
    return [concat(["-", result], flags), concat([result, "-"], flags)];
};
