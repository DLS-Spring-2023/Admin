import { A as Auth } from "../../../chunks/auth.js";
import { f as fail, r as redirect } from "../../../chunks/index.js";
const actions = {
  default: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const auth = new Auth(event);
    if (email && password) {
      const response = await auth.loginUser(email, password);
      if (response.error) {
        return fail(400, { incorrect: true });
      } else {
        throw redirect(302, `/products`);
      }
    } else {
      return fail(400, { missing: true });
    }
  }
};
export {
  actions
};
