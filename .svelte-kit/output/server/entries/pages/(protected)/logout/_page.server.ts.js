import { A as Auth } from "../../../../chunks/auth.js";
import { r as redirect } from "../../../../chunks/index.js";
const actions = {
  default: async (event) => {
    const auth = new Auth(event);
    await auth.logoutUser();
    throw redirect(302, "/");
  }
};
export {
  actions
};
