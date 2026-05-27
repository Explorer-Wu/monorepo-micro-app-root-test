// const { mongoose, Schema, ObjectId } = require('./common.cts');
import mongoose from 'mongoose';
const Schema: any = mongoose.Schema;
const ObjectId: number = Schema.Types.ObjectId;

// 技术相关数据
const TechnologySchema = new Schema({
	uuid: ObjectId,
	name: String,
	usageRatio: String,
	downloads: Number,
	size: Number,

	meta: {
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
			default: Date.now(),
		},
	},
});

TechnologySchema.pre('save', function (this: any, next: any) {
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now();
	} else {
		this.meta.updatedAt = Date.now();
	}
	next();
});

mongoose.model('Technology', TechnologySchema);
