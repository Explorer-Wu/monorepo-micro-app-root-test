// const { mongoose, Schema, ObjectId } = require('./common.cts');

import mongoose from 'mongoose';
const Schema: any = mongoose.Schema;
const ObjectId: number = Schema.Types.ObjectId;

// 应用类型信息
const AppClassesSchema: any = new Schema({
	apptype: String,
	appid: ObjectId,
	// uuid: ObjectId,
	// wechat: String,
	// email: String,
	ratio: String,
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

AppClassesSchema.pre('save', function (this: any, next: any) {
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now();
	} else {
		this.meta.updatedAt = Date.now();
	}

	next();
});

mongoose.model('AppClasses', AppClassesSchema);
