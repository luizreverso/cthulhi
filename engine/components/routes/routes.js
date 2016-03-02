import Route from "./route";
import express from "express";

import ReactRouter from "../react/reactRouterController";
import reactRouterMiddleware from "../react/reactRouterMiddleware";

let expressApp;

export default class Routes {


	constructor(rawRoutes, expressParam) {
		this.unparsedRoutes = rawRoutes;
		if(!expressApp)
			expressApp = expressParam;
	}

	createRootRoutes() {
		let router;
		for (let key in this.unparsedRoutes) {
			let raw = this.unparsedRoutes[key];
			let path = raw.path;
			raw.path = "/";
			router = this.createRoute(key, raw);
			
			if(key == "public" && raw.reactHandler) {
				let reactRouter = new ReactRouter();
				let reactRoutes = reactRouter.getReactRoutes(key, raw);
				reactRouterMiddleware(reactRoutes);
			}

			expressApp.setRoutes(path, router);

		}
		return router;
	}

	createRoute(key, raw) {
		let router = express.Router();
		
		let route = new Route(key, raw);
		route.configExpressRoute(router);
		return router;
	}

	createRoutes(parentPath, parentRouter) {
		let router;
		for (let key in this.unparsedRoutes) {
			let raw = this.unparsedRoutes[key];
			router = this.createRoute(key, raw);
			parentRouter.use(parentPath, router);

			// this.parentRouter.use()
			// expressApp.setRoutes(raw.path, router);
			// expressApp.setRoutes("", router);
		}
		return router;
	}

	// createRoutes() {
	// 	let router;
	// 	for (let key in this.unparsedRoutes) {
	// 		router = express.Router();
	// 		let rawRoute = this.unparsedRoutes[key];

	// 		console.log(key);
	// 		let route = new Route(key, rawRoute, router);
	// 		router = route.configExpressRoute();
	// 		expressApp.setRoutes("", router);
	// 	}
	// 	return router;
	// }

	setParentRouter(router) {
		this.parentRouter = router;
	}
}