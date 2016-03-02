import middlewares from "../utils/middlewaresSingleton";
import paths from "../utils/pathsSingleton";


export default class Middleware {
	constructor(rawMiddlewares) {
		this.rawMiddlewares = rawMiddlewares;
	}

	configMiddlewares() {
		for(let key in this.rawMiddlewares) {
			let raw = this.rawMiddlewares[key];
			let middleware = this.setupMiddleware(raw);
			middlewares[key] = middleware;
		}
	}	

	setupMiddleware(raw) {
		let path = paths.root + raw.path + raw.controller;
		let middlewareController = require(path);
		return middlewareController[raw.action];
	}	
}