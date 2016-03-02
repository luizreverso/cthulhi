import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import exphbs from "express-handlebars";
import express from "express";
import app from "../utils/expressAppSingleton";
import paths from "../utils/pathsSingleton";


export default class Express {
	constructor() {
		this.setup();
	}

	getApp() {
		return app;
	}

	setRoutes(path, router) {
		app.use(path, router);
	}

	startServer(port=8080) {
		app.use("/", express.static(paths.root + "/dist/"));

		app.listen(port);
	}

	setup() {
		this.setupHandlebars();
		this.setupViewEngine();
		this.setupThirdParties();
		this.setupSession();
		this.setupSecurity();
		this.setupReactRouterMiddleware();
	}

	setupHandlebars() {
		app.engine("handlebars", exphbs({ 
			defaultLayout: "main",
			helpers: {
				partial: function (name) {
					return name;
				}
			}
		}));
	}

	setupViewEngine() {
		app.set("view engine", "handlebars");
	}

	setupThirdParties() {
		app.use(logger("dev"));
		app.use(cookieParser());
		app.use(bodyParser());
	}

	setupSession() {
		app.use(session({secret: "teste"}));
	}

	setupSecurity() {
		app.use(passport.initialize());
		app.use(passport.session());
		app.set("tokenSecret", "teste");
	}

	setupReactRouterMiddleware() {
		// reactRouterMiddleware(app, reactRoutes);
	}
}
