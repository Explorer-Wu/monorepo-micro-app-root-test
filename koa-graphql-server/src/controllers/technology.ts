import mongoose from 'mongoose';
const Technology = mongoose.model('Technology');
const TechInfo = mongoose.model('TechInfo');

const saveTechnology = async (ctx: any, next: any) => {
	const opts = ctx.request.body;

	const technology = new Technology(opts);
	const saveTechn = await technology.save();

	if (saveTechn) {
		ctx.body = {
			success: true,
			data: saveTechn,
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

const fetchTechnology = async (ctx: any, next: any) => {
	const technologies = await Technology.find({});

	if (technologies.length) {
		ctx.body = {
			success: true,
			data: technologies,
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

const fetchTechnologyDetail = async (ctx: any, next: any) => {
	const info = await TechInfo.find({ techId: ctx.request.query.id });
	if (info.length) {
		ctx.body = {
			success: true,
			data: info[0],
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

export { saveTechnology, fetchTechnology, fetchTechnologyDetail };
