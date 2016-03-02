import controllers from "../utils/controllersSingleton";
import paths from "../utils/pathsSingleton";


export default class Controller {
	constructor(rawControllers) {
		this.rawControllers = rawControllers;
	}

	configControllers() {
		for(let key in this.rawControllers) {
			let raw = this.rawControllers[key];
			let controller = this.setupController(raw);
			controllers[key] = controller;
		}
	}	

	setupController(raw) {
		let path = paths.root + raw.path + raw.controller;
		let controller = require(path);
		if(raw.type == "class") {
			controller = new controller.default();
		}
		return controller[raw.action];
	}	
}