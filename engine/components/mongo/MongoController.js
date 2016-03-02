import mongoose, {Schema} from "mongoose";

export default class MongoController {
	contructor(){}

	connectMongo(config) {
		
		mongoose.connect(config.connection);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error...'));
		db.once('open', () => {
			console.log('db up and ready to roll');
			this.createSchemas(config.models);
		});
	}

	createSchemas(models) {
		for(let name in models) {
			this.createSchema(name, models[name]);
		}
	}

	createSchema(name, model) {
		mongoose.model(name, new Schema(model));
	}
}
