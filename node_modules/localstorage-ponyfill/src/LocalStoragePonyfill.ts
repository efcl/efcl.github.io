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
