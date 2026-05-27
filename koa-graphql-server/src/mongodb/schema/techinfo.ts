import mongoose from 'mongoose';
const Schema: any = mongoose.Schema;
const ObjectId: number = Schema.Types.ObjectId;

// 技术详细信息
const TechInfoSchema = new Schema({
	fork: Number,
	watch: Number,
	stars: Number,
	issues: Number,
	techid: ObjectId,
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

TechInfoSchema.pre('save', function (this: any, next: any) {
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now();
	} else {
		this.meta.updatedAt = Date.now();
	}
	next();
});

mongoose.model('TechInfo', TechInfoSchema);
