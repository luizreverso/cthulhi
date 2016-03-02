import express from "express";
import Routes from "./routes";
import expressApp from "../utils/expressAppSingleton";
import mapedMiddlewares from "../utils/middlewaresSingleton";
import mapedControllers from "../utils/controllersSingleton";
import cthulhiConfig from "../utils/rawCthulhiConfigSingleton";

export default class Route {


	constructor(routeName, rawRoute) {
		this.name = routeName;
		this.route = rawRoute;
	}

	configExpressRoute(router) {
		if(this.route.type == "post") {
			router.post(this.getPath(), ...this.getMiddlewares(), this.getController());
		} else {
			router.get(this.getPath(), ...this.getMiddlewares(), this.getController());
		}

		if(this.route.routes) {
			this.configRoutes(router);
		}
		return router;
	}

	getPath() {
		return this.route.path;
	}

	getMiddlewares() {
		let middlewares = [];
		for(let key in this.route.middlewares) {
			let value = this.route.middlewares[key];
			middlewares.push(mapedMiddlewares[value]);
		}
		return middlewares;
	}

	getController() {
		if(this.route.controller)
			return mapedControllers[this.route.controller];

		let expressName = this.name;
		return function(req, res) {

			let reactComponent = req.reactComponent;
			let routes = req.renderProps;
			let rawRoutes = cthulhiConfig.routes;

			res.render("login/index", {
				reactComponent: reactComponent,
				teste : "quale",
				partialTemplate : "partialteste",
				routes : JSON.stringify(routes),
				rawRoutes : JSON.stringify(rawRoutes)
			});
		};
	}

	configRoutes(router) {
		this.routes = new Routes(this.route.routes);
		let routesRouter = this.routes.createRoutes(this.getPath(), router);
	}
}
