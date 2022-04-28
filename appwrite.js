import { Appwrite, Query } from "appwrite"; //importing from Appwrite's SDK

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) //set your own endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); //set your own project id

const postsCollection = "626191cb6d55c560840a";
const columnsCollection = "62650fe54967ee4780ab";
const boardsCollection = "6269a2609a2d7334def7";

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
      //   setUser(user);
      //   state.update((n) => {
      //     n.user = user;
      //     return n;
      //   });
    } catch (error) {
      //   state.update((n) => {
      //     n.user = null;
      //     return n;
      //   });
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
  fetchPostsByColumnId: (columnId) => {
    return sdk.database.listDocuments(postsCollection, [
      Query.equal("column_id", columnId),
    ]);
  },
  fetchColumns: (board_id) => {
    return sdk.database.listDocuments(columnsCollection, [
      Query.equal("board_id", board_id),
    ]);
  },
  fetchPosts: (post) => {
    return sdk.database.listDocuments(postsCollection);
  },
  getBoards: () => {
    return sdk.database.listDocuments(boardsCollection);
  },

  createPost: async (data, userId, profileId) => {
    return sdk.database.createDocument(
      postsCollection,
      "unique()",
      data,
      ["role:all"],
      [`user:${userId}`]
    );
  },
  updatePost: async (id, data, userId) => {
    return sdk.database.updateDocument(
      postsCollection,
      id,
      data,
      ["role:all"]
      //   [`user:${userId}`]
    );
  },
  createColumn: async (data, userId, profileId) => {
    return sdk.database.createDocument(
      columnsCollection,
      "unique()",
      data,
      ["role:all"]
      // [`user:${userId}`]
    );
  },
};
