import { sha256 } from 'js-sha256';


let DB: IDBDatabase | null = null;

export const getDB = async (): Promise<IDBDatabase | null> => {
    if (DB) return DB;

    return new Promise((resolve, reject) => {
        const indexedDB = window.indexedDB;
        if (!indexedDB) {
            resolve(null);
        }

        const request = indexedDB.open('knilim');

        request.onsuccess = (e: Event) => {
            DB = request.result as IDBDatabase;

            if (!DB.objectStoreNames.contains('user')) {
                DB.createObjectStore('user', {keyPath: 'id'});
            }
            if (!DB.objectStoreNames.contains('msgList')) {
                DB.createObjectStore('msgList', {keyPath: 'id'});
            }
            if (!DB.objectStoreNames.contains('notiList')) {
                DB.createObjectStore('notiList', {keyPath: 'id'});
            }

            setTimeout(() => resolve(DB), 500);
        };

        request.onerror = (e: Event) => {
            resolve(null);
        }

        request.onupgradeneeded = (e: any) => {
            DB = e.target.result as IDBDatabase;
            if (!DB) {
                resolve(null);
            }

            if (!DB.objectStoreNames.contains('user')) {
                DB.createObjectStore('user', {keyPath: 'id'});
            }
            if (!DB.objectStoreNames.contains('msgList')) {
                DB.createObjectStore('msgList', {keyPath: 'id'});
            }
            if (!DB.objectStoreNames.contains('notiList')) {
                DB.createObjectStore('notiList', {keyPath: 'id'});
            }

            setTimeout(() => resolve(DB), 500);
        }
    });
};

export const encryptBySha256 = (passwd: string): string => {
    return sha256(passwd);
};
