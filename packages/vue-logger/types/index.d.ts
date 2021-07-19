// declare const _default: {
//     install: (Vue: any) => void;
// };
// export default _default;

// import Vue, { VNode } from 'vue'
// import { MessageType } from './message'

export interface IConfigOptions {
    traceId?: string;
    mapURI?: string;
    serverURL?: string;
    encryptionFunc?: IEncryptionFunc;
    statement?: {
        [state: string]: any;
    };
}

declare module 'vue/types/vue' {
    interface Vue {
        /** Show a message box */
        $logMount: IConfigOptions
    }
}
