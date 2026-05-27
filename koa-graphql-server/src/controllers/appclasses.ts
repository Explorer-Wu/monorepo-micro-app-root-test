import mongoose from 'mongoose';

const AppClasses = mongoose.model('AppClasses');

const saveAppClasses = async (ctx: any, next: any) => {
	const opts = ctx.request.body;

	const apps = new AppClasses(opts);
	const saveApps = await apps.save();

	if (saveApps) {
		ctx.body = {
			success: true,
			data: saveApps,
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

const fetchAppClasses = async (ctx: any, next: any) => {
	const fapps = await AppClasses.find({});

	if (fapps.length) {
		ctx.body = {
			success: true,
			data: fapps,
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

export { saveAppClasses, fetchAppClasses };
