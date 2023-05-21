import Jwt from "jsonwebtoken";
import type { AuthenticationResponse } from "./authentication.interface";
import { redirect, type Cookies, type RequestEvent } from "@sveltejs/kit";
import { AUTH_API_KEY, AUTH_PROJECT_ID } from "$env/static/private";
import Fetch from "./fetch";

interface AuthOptions {
  cookies?: Cookies;
}

class Auth {
  private static PUBLIC_KEY: string | undefined;

  private fetch: Fetch;
  private event: RequestEvent;

  constructor(event: RequestEvent) {
    this.fetch = new Fetch(event.cookies);
    this.event = event;
  }

  private static async getPublicKey() {
    if (this.PUBLIC_KEY) return this.PUBLIC_KEY;

    const apiCall = new Fetch();
    const response = await apiCall.GET("/keys/project/" + AUTH_PROJECT_ID);
    if (!response.error) {
      this.PUBLIC_KEY = response.data?.publicKey;
    }

    return this.PUBLIC_KEY;
  }

  static async verifyUser(event: RequestEvent): Promise<boolean> {
    const accessToken = event.cookies.get("access_token");
    const refreshToken = event.cookies.get("refresh_token");

    if (!accessToken && refreshToken) {
      const auth = new Auth(event);
      await auth.refresh();
    }

    let verified;
    if (accessToken) {
      const publicKey = await this.getPublicKey();

      if (publicKey) verified = await Jwt.verify(accessToken, publicKey);
    }

    if (!verified) {
      event.cookies.delete("access_token");
      event.cookies.delete("refresh_token");
    }

    if (
      !event.cookies.get("access_token") &&
      event.route.id?.startsWith("/(protected)")
    ) {
      throw redirect(302, `/`);
    } else if (
      event.cookies.get("access_token") &&
      event.route.id?.startsWith("/(public)")
    ) {
      throw redirect(302, "/products");
    }

    return !!event.cookies.get("access_token");
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<AuthenticationResponse> {
    const response = await this.fetch.POST(
      `/user/login?API_KEY=${AUTH_API_KEY}`,
      {
        body: { email, password },
      }
    );

    return response;
  }

  async refresh(): Promise<void> {
    await this.fetch.GET(`/user?API_KEY=${AUTH_API_KEY}`);
  }

  async logoutUser(): Promise<void> {
    await this.fetch.POST(`/user/logout?API_KEY=${AUTH_API_KEY}`);
    this.event.cookies.delete("access_token");
    this.event.cookies.delete("refresh_token");
  }
}

export default Auth;
