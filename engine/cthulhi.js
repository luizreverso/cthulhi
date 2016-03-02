import Express from "./components/express/expressCthulhi";
import Middlewares from "./components/middlewares/middlewareController";
import Controllers from "./components/controllers/controllerController";
import MongoController from "./components/mongo/MongoController";
import Routes from "./components/routes/routes";
import paths from "./components/utils/pathsSingleton";
import cthulhiConfig from "./components/utils/rawCthulhiConfigSingleton";


let express;

export default class Cthulhi {

	constructor() {
		express = new Express();
	}

	config(config) {
		this.setReactComponentsPath(config.paths.reactComponents);
		this.configMiddlewares(config.middlewares);
		this.configControllers(config.controllers);
		this.configRoutes(config.routes);
		this.configMongo(config.mongo);
	}

	setRootPath(dirname) {
		paths.root = dirname;
	}

	setReactComponentsPath(path) {
		paths.reactComponents = path;
	}

	configMiddlewares(middlewares) {
		let middleware = new Middlewares(middlewares);
		middleware.configMiddlewares();
	}

	configControllers(controllers) {
		let controller = new Controllers(controllers);
		controller.configControllers();
	}

	configRoutes(rawRoutes) {
		cthulhiConfig.routes = rawRoutes;
		let routes = new Routes(rawRoutes, express);
		let router = routes.createRootRoutes();	
	}

	configMongo(config) {
		const mongo = new MongoController();
		mongo.connectMongo(config);
		// mongo.createSchemas(config.models);
	}

	startServer() {

		express.startServer();
	}
}
