import { AUTH_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import type { AuthTokens, FetchOptions, Response } from "./authentication.interface";

class Fetch {
    private cookies: Cookies | undefined;

    constructor(cookies?: Cookies) {
        this.cookies = cookies;
    }

    private getHeaders = () => {
        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };
        
        if (this.cookies) {
            const authTokens: AuthTokens = {};
            const accessToken = this.cookies.get('access_token');
            const refreshToken = this.cookies.get('refresh_token');

            if (accessToken) authTokens.access_token = 'Bearer ' + accessToken;
            if (refreshToken) authTokens.refresh_token = 'Session ' + refreshToken;
    
            const authHeader = [authTokens.access_token, authTokens.refresh_token].filter(t => t !== undefined).join(', ');
            headers['Authorization'] = authHeader;
        }
        
        return headers;
    }
    
    private async call(path: string, options?: RequestInit): Promise<Response> {
        try {
            const response = await fetch(AUTH_URL + '/v1' + path, options);
            
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: {
                        code: error.code,
                        message: error.message
                    }
                }
            }
    
            let data: Response = { auth: this.getAuth(response) };
            try { 
                const json = await response.json() 
                data.data = json.data ? json.data : json;
            } catch (_) {}
            return data
            
        } catch (error) {
            return {
                error: {
                    code: 500,
                    message: error as string
                }
            }
        }
    }
    
    private getAuth(response: globalThis.Response): AuthTokens | undefined {
        const headers = response.headers;

        const authTokens: AuthTokens = {};
        const authHeaders = headers.get('Authorization');
    
        if (!authHeaders) return;
        
        authHeaders.split(', ').forEach((token: string) => {
            const [type, value] = token.split(' ');
            if (type === 'Bearer') authTokens.access_token = value;
            if (type === 'Session') authTokens.refresh_token = value;
        });

        this.setCookies(authTokens);
        return authTokens;
    }
    
    private setCookies = (authTokens: AuthTokens) => {
        if (!this.cookies) return;

        if (authTokens.access_token) {
            this.cookies.set('access_token', authTokens.access_token, {
                path: '/',
                maxAge: 60 * 15 - 10, // 15 minutes minus 10 seconds 
                httpOnly: true,
                sameSite: 'strict',
                secure: true
            });
        }

        if (authTokens.refresh_token) {
            this.cookies.set('refresh_token', authTokens.refresh_token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365, // 1 year
                httpOnly: true,
                sameSite: 'strict',
                secure: true
            });
        }
    }

    
    async GET(path: string) {
        return await this.call(path, {
            method: 'GET',
            headers: this.getHeaders()
        });
    }
    
    async POST(path: string, options?: FetchOptions) {
        return await this.call(path, {
            method: 'POST',
            headers: this.getHeaders(),
            body: options?.body ? JSON.stringify(options?.body) : null
        });
    }
    
    async PUT(path: string, options?: FetchOptions) {
        return await this.call(path, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: options?.body ? JSON.stringify(options.body) : null
        });
    }
    
    async DELETE(path: string, options?: FetchOptions) {
        return await this.call(path, {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: options?.body ? JSON.stringify(options?.body) : null
        });
    }
}

export default Fetch;