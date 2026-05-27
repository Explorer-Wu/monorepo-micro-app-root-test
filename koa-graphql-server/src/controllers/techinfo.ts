import mongoose from 'mongoose';
const TechInfo = mongoose.model('TechInfo');

const saveTechInfo = async (ctx: any, next: any) => {
	const opts = ctx.request.body;
	const info = new TechInfo(opts);
	const saveInfo = await info.save();
	console.log('saveTechInfo:', saveInfo);

	if (saveInfo) {
		ctx.body = {
			success: true,
			data: saveInfo,
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

const fetchTechInfo = async (ctx: any, next: any) => {
	const infos = await TechInfo.find({});
	if (infos.length) {
		ctx.body = {
			success: true,
			data: infos,
		};
	} else {
		ctx.body = {
			success: false,
		};
	}
};

export { saveTechInfo, fetchTechInfo };
