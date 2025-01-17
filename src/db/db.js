const DATABASE_NAME = "usersDb";
const STORE_NAME = "users";
const DB_VERSION = 1;

export const initDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const getUsers = async () => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const users = request.result;
            if (users.length > 0) {
                resolve(users);
            } else {
                resolve([]);
            }
        };
        request.onerror = () => reject(request.error);
    });
};

export const adduser = async (user) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(user);

        request.onsuccess = () => { resolve(0); };
        request.onerror = () => reject(request.error);
    });
};

export const deleteUser = async (id) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => { resolve(0); };
        request.onerror = () => reject(request.error);
    });
};

export const addUsersFromAPI = async (users) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        users.forEach((user) => {
            store.add(user);
        });

        transaction.oncomplete = () => resolve(0);
        transaction.onerror = () => reject(transaction.error);
    });
};

export const clearIndexedDB = async () => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME);

    request.onsuccess = () => {
        console.log(`Database "${DATABASE_NAME}" deleted successfully.`);
    };

    request.onerror = (event) => {
        console.error(`Error deleting database "${DATABASE_NAME}":`, event.target.error);
    };

    request.onblocked = () => {
        console.warn(`Database "${DATABASE_NAME}" deletion is blocked. Close other tabs using it.`);
    };
}
