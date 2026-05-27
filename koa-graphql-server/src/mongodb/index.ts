import mongoose from 'mongoose';
import config from '../settings';

import './schema/appclasses';
import './schema/technology';
import './schema/techinfo';

const database = () => {
	mongoose.set('debug', true);
	mongoose.connect(config.dbPath);
	mongoose.connection.on('disconnected', () => {
		mongoose.connect(config.dbPath);
	});
	mongoose.connection.on('error', (err: any) => {
		console.error(err);
	});

	mongoose.connection.on('open', async () => {
		console.log('Connected to MongoDB ', config.dbPath);
	});
};

database();
