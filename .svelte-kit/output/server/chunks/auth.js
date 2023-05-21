import Jwt from "jsonwebtoken";
import { r as redirect } from "./index.js";
import { A as AUTH_URL, a as AUTH_PROJECT_ID, b as AUTH_API_KEY } from "./private.js";
class Fetch {
  cookies;
  constructor(cookies) {
    this.cookies = cookies;
  }
  getHeaders = () => {
    const headers = {
      "Content-Type": "application/json"
    };
    if (this.cookies) {
      const authTokens = {};
      const accessToken = this.cookies.get("access_token");
      const refreshToken = this.cookies.get("refresh_token");
      if (accessToken)
        authTokens.access_token = "Bearer " + accessToken;
      if (refreshToken)
        authTokens.refresh_token = "Session " + refreshToken;
      const authHeader = [authTokens.access_token, authTokens.refresh_token].filter((t) => t !== void 0).join(", ");
      headers["Authorization"] = authHeader;
    }
    return headers;
  };
  async call(path, options) {
    try {
      const response = await fetch(AUTH_URL + "/v1" + path, options);
      if (!response.ok) {
        const error = await response.json();
        return {
          error: {
            code: error.code,
            message: error.message
          }
        };
      }
      let data = { auth: this.getAuth(response) };
      try {
        const json = await response.json();
        data.data = json.data ? json.data : json;
      } catch (_) {
      }
      return data;
    } catch (error) {
      return {
        error: {
          code: 500,
          message: error
        }
      };
    }
  }
  getAuth(response) {
    const headers = response.headers;
    const authTokens = {};
    const authHeaders = headers.get("Authorization");
    if (!authHeaders)
      return;
    authHeaders.split(", ").forEach((token) => {
      const [type, value] = token.split(" ");
      if (type === "Bearer")
        authTokens.access_token = value;
      if (type === "Session")
        authTokens.refresh_token = value;
    });
    this.setCookies(authTokens);
    return authTokens;
  }
  setCookies = (authTokens) => {
    if (!this.cookies)
      return;
    if (authTokens.access_token) {
      this.cookies.set("access_token", authTokens.access_token, {
        path: "/",
        maxAge: 60 * 15 - 10,
        // 15 minutes minus 10 seconds
        httpOnly: true,
        sameSite: "strict",
        secure: true
      });
    }
    if (authTokens.refresh_token) {
      this.cookies.set("refresh_token", authTokens.refresh_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        // 1 year
        httpOnly: true,
        sameSite: "strict",
        secure: true
      });
    }
  };
  async GET(path) {
    return await this.call(path, {
      method: "GET",
      headers: this.getHeaders()
    });
  }
  async POST(path, options) {
    return await this.call(path, {
      method: "POST",
      headers: this.getHeaders(),
      body: options?.body ? JSON.stringify(options?.body) : null
    });
  }
  async PUT(path, options) {
    return await this.call(path, {
      method: "PUT",
      headers: this.getHeaders(),
      body: options?.body ? JSON.stringify(options.body) : null
    });
  }
  async DELETE(path, options) {
    return await this.call(path, {
      method: "DELETE",
      headers: this.getHeaders(),
      body: options?.body ? JSON.stringify(options?.body) : null
    });
  }
}
class Auth {
  static PUBLIC_KEY;
  fetch;
  event;
  constructor(event) {
    this.fetch = new Fetch(event.cookies);
    this.event = event;
  }
  static async getPublicKey() {
    if (this.PUBLIC_KEY)
      return this.PUBLIC_KEY;
    const apiCall = new Fetch();
    const response = await apiCall.GET("/keys/project/" + AUTH_PROJECT_ID);
    if (!response.error) {
      this.PUBLIC_KEY = response.data?.publicKey;
    }
    return this.PUBLIC_KEY;
  }
  static async verifyUser(event) {
    const accessToken = event.cookies.get("access_token");
    const refreshToken = event.cookies.get("refresh_token");
    if (!accessToken && refreshToken) {
      const auth = new Auth(event);
      await auth.refresh();
    }
    let verified;
    if (accessToken) {
      const publicKey = await this.getPublicKey();
      if (publicKey)
        verified = await Jwt.verify(accessToken, publicKey);
    }
    if (!verified) {
      event.cookies.delete("access_token");
      event.cookies.delete("refresh_token");
    }
    if (!event.cookies.get("access_token") && event.route.id?.startsWith("/(protected)")) {
      throw redirect(302, `/`);
    } else if (event.cookies.get("access_token") && event.route.id?.startsWith("/(public)")) {
      throw redirect(302, "/products");
    }
    return !!event.cookies.get("access_token");
  }
  async loginUser(email, password) {
    const response = await this.fetch.POST(
      `/user/login?API_KEY=${AUTH_API_KEY}`,
      {
        body: { email, password }
      }
    );
    return response;
  }
  async refresh() {
    await this.fetch.GET(`/user?API_KEY=${AUTH_API_KEY}`);
  }
  async logoutUser() {
    await this.fetch.POST(`/user/logout?API_KEY=${AUTH_API_KEY}`);
    this.event.cookies.delete("access_token");
    this.event.cookies.delete("refresh_token");
  }
}
export {
  Auth as A
};
