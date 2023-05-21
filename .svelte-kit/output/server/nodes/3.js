import * as server from '../entries/pages/(protected)/products/_page.server.ts.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/(protected)/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(protected)/products/+page.server.ts";
export const imports = ["_app/immutable/entry/(protected)-products-page.svelte.77c09146.js","_app/immutable/chunks/index.c0957339.js","_app/immutable/chunks/index.5750f60b.js"];
export const stylesheets = ["_app/immutable/assets/_page.6127afae.css"];
export const fonts = [];
