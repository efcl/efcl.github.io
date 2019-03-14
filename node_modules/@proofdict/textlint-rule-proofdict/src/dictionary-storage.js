// MIT © 2018 azu
"use strict";
const { createLocalStorage } = require("localstorage-ponyfill");

class Storage {
    constructor() {
        this.localStorage = createLocalStorage();
    }

    getItem(name, defaultValue) {
        return this.localStorage.getItem(name, defaultValue);
    }

    setItem(name, value) {
        return this.localStorage.setItem(name, value);
    }

    removeItem(name) {
        return this.localStorage.removeItem(name);
    }
}

export const storage = new Storage();
