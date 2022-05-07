import { Appwrite, Query } from "appwrite"; //importing from Appwrite's SDK

const postsCollection = process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION;
const columnsCollection = process.env.NEXT_PUBLIC_APPWRITE_COLUMNS_COLLECTION;
const boardsCollection = process.env.NEXT_PUBLIC_APPWRITE_BOARDS_COLLECTION;

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) //set your own endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); //set your own project id

export const api = {
  register: async (name, mail, pass) => {
    try {
      await sdk.account.create("unique()", mail, pass, name);
      await api.login(mail, pass);
    } catch (error) {
      throw error;
    }
  },
  login: async (mail, pass) => {
    try {
      await sdk.account.createSession(mail, pass);
      const user = await api.getAccount();
      console.log(`Got user: ${user.name}`);
      return user;
    } catch (error) {
      console.log(`No user found`);
      throw error;
    }
  },
  getAccount: async () => sdk.account.get(),
  logout: async () => {
    try {
      await sdk.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  },
  fetchPostById: (documentId) => {
    return sdk.database.getDocument(postsCollection, documentId);
  },
  deletePostById: (documentId) => {
    return sdk.database.deleteDocument(postsCollection, documentId);
  },
  fetchPostsByColumnId: (columnId) => {
    return sdk.database.listDocuments(postsCollection, [
      Query.equal("column_id", columnId),
    ]);
  },
  fetchColumns: (boardId) => {
    return sdk.database.listDocuments(columnsCollection, [
      Query.equal("board_id", boardId),
    ]);
  },
  fetchPosts: (post) => {
    return sdk.database.listDocuments(postsCollection);
  },
  getBoards: () => {
    return sdk.database.listDocuments(boardsCollection);
  },
  getBoardById: (boardId) => {
    return sdk.database.getDocument(boardsCollection, boardId);
  },

  createPost: async (data) => {
    return sdk.database.createDocument(postsCollection, "unique()", data);
  },
  updatePost: async (id, data) => {
    return sdk.database.updateDocument(postsCollection, id, data);
  },
  createColumn: async (data) => {
    return sdk.database.createDocument(columnsCollection, "unique()", data);
  },
  createBoard: async (data) => {
    return sdk.database.createDocument(boardsCollection, "unique()", data);
  },
};
