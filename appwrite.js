import { Appwrite, Query, limit } from "appwrite";

const postsCollection = process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION;
const columnsCollection = process.env.NEXT_PUBLIC_APPWRITE_COLUMNS_COLLECTION;
const boardsCollection = process.env.NEXT_PUBLIC_APPWRITE_BOARDS_COLLECTION;
const activitiesCollection =
  process.env.NEXT_PUBLIC_APPWRITE_ACTIVITIES_COLLECTION;

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

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
  getColumn: (id) => {
    return sdk.database.getDocument(columnsCollection, id);
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
  deleteBoard: (id) => {
    return sdk.database.deleteDocument(boardsCollection, id);
  },
  createActivity: async (data) => {
    return sdk.database.createDocument(activitiesCollection, "unique()", data);
  },
  getPostsInColumn: (columnId) => {
    return sdk.database.listDocuments(
      postsCollection,
      [Query.equal("column_id", columnId)],
      100
    );
  },
  getColumnsInBoard: (boardId) => {
    return sdk.database.listDocuments(
      columnsCollection,
      [Query.equal("board_id", boardId)],
      100
    );
  },
  getAllPosts: () => {
    return sdk.database.listDocuments(postsCollection, [], 100);
  },
  getAllColumns: () => {
    return sdk.database.listDocuments(columnsCollection, [], 100);
  },
  getAllBoards: () => {
    return sdk.database.listDocuments(boardsCollection, [], 100);
  },
  getAllActivities: () => {
    return sdk.database.listDocuments(activitiesCollection, [], 100);
  },
};
