// LICENSE : MIT
"use strict";
import MixedChecker from "./MixedChecker"
export default class HeaderMixedChecker extends MixedChecker {
    outputMessage(token) {
        return "見出し: " + super.outputMessage(token);
    }
}