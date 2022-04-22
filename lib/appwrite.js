// Create a new file under lib/appwrite.js
import { Appwrite } from "appwrite";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
    api.sdk = appwrite;
    return appwrite;
  },

  createSession: (email, password) => {
    return api.provider().account.createAnonymousSession();
  },

  createUser: (id, email, password, name) => {
    return api.provider().account.create(id, email, password, name);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  getDocument: (collectionId, documentId) => {
    return api.provider().database.getDocument(collectionId, documentId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
