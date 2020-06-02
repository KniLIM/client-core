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
            resolve(DB);
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
            setTimeout(() => resolve(DB), 500);
        }
    });
};
