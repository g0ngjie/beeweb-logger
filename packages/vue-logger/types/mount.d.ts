
export declare type IEncryptionFunc = Function | 'useDefault';

export interface IConfigOptions {
    traceId?: string;
    mapURI?: string;
    serverURL?: string;
    encryptionFunc?: IEncryptionFunc;
    statement?: {
        [state: string]: any;
    };
}

declare function mount(options?: IConfigOptions): void;

declare module 'vue/types/vue' {
    interface Vue {
        $logMount(options: IConfigOptions): void
    }
}
