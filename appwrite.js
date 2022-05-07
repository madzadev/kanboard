import { Appwrite, Query } from "appwrite"; //importing from Appwrite's SDK

const postsCollection = process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION;
const columnsCollection = process.env.NEXT_PUBLIC_APPWRITE_COLUMNS_COLLECTION;
const boardsCollection = process.env.NEXT_PUBLIC_APPWRITE_BOARDS_COLLECTION;

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) //set your own endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); //set your own project id

export const api = {
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
  logout: async () => {
    try {
      await sdk.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  },
  getAccount: async () => sdk.account.get(),
  getPost: (id) => {
    return sdk.database.getDocument(postsCollection, id);
  },
  createPost: async (data) => {
    return sdk.database.createDocument(postsCollection, "unique()", data);
  },
  updatePost: async (id, data) => {
    return sdk.database.updateDocument(postsCollection, id, data);
  },
  deletePost: (id) => {
    return sdk.database.deleteDocument(postsCollection, id);
  },
  createColumn: async (data) => {
    return sdk.database.createDocument(columnsCollection, "unique()", data);
  },
  deleteColumn: (id) => {
    return sdk.database.deleteDocument(columnsCollection, id);
  },
  getBoard: (id) => {
    return sdk.database.getDocument(boardsCollection, id);
  },
  createBoard: async (data) => {
    return sdk.database.createDocument(boardsCollection, "unique()", data);
  },
  // EDIT These below
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
};
