// @ts-nocheck
import Auth from "$lib/server/auth/auth";
import { type Actions, redirect } from "@sveltejs/kit";

export const actions = {
  default: async (event: import('./$types').RequestEvent) => {
    const auth = new Auth(event);
    await auth.logoutUser();

    throw redirect(302, "/");
  },
};
;null as any as Actions;