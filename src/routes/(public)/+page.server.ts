import Auth from "$lib/server/auth/auth";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event: RequestEvent) => {
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
  },
};
