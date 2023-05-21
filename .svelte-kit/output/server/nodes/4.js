import * as server from '../entries/pages/(public)/_page.server.ts.js';

export const index = 4;
export const component = async () => (await import('../entries/pages/(public)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(public)/+page.server.ts";
export const imports = ["_app/immutable/entry/(public)-page.svelte.4af98563.js","_app/immutable/chunks/index.c0957339.js"];
export const stylesheets = ["_app/immutable/assets/_page.1e76ed87.css"];
export const fonts = [];
