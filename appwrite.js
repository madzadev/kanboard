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
};
