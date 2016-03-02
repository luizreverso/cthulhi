import React from "react";
import {Router, Route} from "react-router";
import paths from "../utils/pathsSingleton";

export default class reactRouterController {
	constructor() {
	}

	getReactRoutes(name, raw) {

		const route = React.createElement(Route, 
									this.getReactRouteParams(name, raw),
									this.getChildrenReactRoutes(raw));
		return route;
	}


	getReactRouteParams(name, raw) {
		const reactComponent = require(paths.root + paths.reactComponents + raw.reactHandler);
		const routeParams = {
			name: name,
			path: raw.path,
			handler: reactComponent.default,
			component: reactComponent.default
		}
		return routeParams;
	}


	getChildrenReactRoutes(route) {
		let childRoutes = [];

		for(let key in route.routes) {
			const raw = route.routes[key];
			
			if(!raw.reactHandler) continue;
			
			const child = this.getReactRoutes(key, raw);
			childRoutes.push(child);
		}

		return childRoutes;
	}

}