// @ts-nocheck
import Auth from "$lib/server/auth/auth";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";

/** */
export const actions = {
  default:/** @param {import('./$types').RequestEvent} event */  async (event: RequestEvent) => {
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
        throw redirect(302, `/items`);
      }
    } else {
      return fail(400, { missing: true });
    }
  },
};
