export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.88941c67.js","app":"_app/immutable/entry/app.681bb668.js","imports":["_app/immutable/entry/start.88941c67.js","_app/immutable/chunks/index.c0957339.js","_app/immutable/chunks/singletons.2ec6e9c7.js","_app/immutable/chunks/index.5750f60b.js","_app/immutable/entry/app.681bb668.js","_app/immutable/chunks/index.c0957339.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				id: "/(public)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(protected)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/(protected)/products",
				pattern: /^\/products\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
