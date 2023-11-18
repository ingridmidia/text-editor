import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Update the same record in the database https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put
  const request = store.put({ content, id: 1 });
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Always get the record stored with the id 1
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  // If result is undefined the function return undefined
  return result?.content;
};

initdb();
