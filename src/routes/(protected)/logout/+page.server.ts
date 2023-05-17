import Auth from "$lib/server/auth/auth";
import { type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async (event) => {
    const auth = new Auth(event);
    await auth.logoutUser();

    throw redirect(302, "/");
  },
};
