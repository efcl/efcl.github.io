// LICENSE : MIT
"use strict";
import MixedChecker from "./MixedChecker"
export default class BodyMixedChecker extends MixedChecker {
    outputMessage(token) {
        return "本文: " + super.outputMessage(token);
    }
}