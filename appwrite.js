import { Appwrite } from "appwrite"; //importing from Appwrite's SDK

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
};
