import { gql } from 'apollo-server-koa';
import mongoose from 'mongoose';

const AppClassesModel = mongoose.model('AppClasses');
const TechInfoModel = mongoose.model('TechInfo');
const TechnologyModel = mongoose.model('Technology');

const typeDefs = gql`
	type AppClasses {
		apptype: String
		ratio: String
		appid: ID
		_id: ID
	}
	type TechInfo {
		fork: Int
		watch: Int
		stars: Int
		issues: Int
		techid: ID
		_id: ID
	}
	type Technology {
		name: String
		usageRatio: String
		downloads: Int
		size: Int
		_id: ID
		info: TechInfo
	}
	type Query {
		getAppClasses: [AppClasses]
		getTechnology: [Technology]
		getTechInfo(id: ID): TechInfo
		getTechInfos: [TechInfo]
	}
	type Mutation {
		addAppClasses(post: AppClassesInput): AppClasses
		addTechnology(post: TechnologyInput): Technology
		addTechInfo(post: TechInfoInput): TechInfo
		changeTechInfo(put: TechInfoInput): TechInfo
	}
	input AppClassesInput {
		apptype: String
		ratio: String
		id: ID
	}
	input TechInfoInput {
		fork: Int
		watch: Int
		stars: Int
		issues: Int
		id: ID
	}
	input TechnologyInput {
		name: String
		usageRatio: String
		downloads: Int
		size: Int
	}
`;

const resolvers = {
	Query: {
		getAppClasses: (parent?: any, args?: any, context?: any, info?: any) => {
			return AppClassesModel.find({});
		},
		getTechnology: (parent?: any, args?: any, context?: any, info?: any) => {
			return TechnologyModel.find({});
		},
		getTechInfo: async (parent?: any, args?: any, context?: any, info?: any) => {
			let res = await TechInfoModel.find({ studentId: args.id });
			return res[0];
		},
		getTechInfos: (parent?: any, args?: any, context?: any, info?: any) => {
			return TechInfoModel.find({});
		},
	},
	Mutation: {
		addAppClasses: (parent?: any, args?: any, context?: any) => {
			const { id, apptype, ratio } = args;
			return AppClassesModel.create({ appid: id, apptype, ratio });
		},
		addTechnology: (parent?: any, args?: any, context?: any) => {
			const { name, usageRatio, downloads, size } = args.post;
			return TechnologyModel.create({ name, usageRatio, downloads, size });
		},
		addTechInfo: (parent?: any, args?: any, context?: any) => {
			const { id, fork, watch, stars, issues } = args.post;
			return TechInfoModel.create({ techid: id, fork, watch, stars, issues });
		},
		changeTechInfo: (parent?: any, args?: any, context?: any) => {
			const { id, fork, watch, stars, issues } = args.put;
			return AppClassesModel.findOneAndUpdate({ techid: id }, { fork, watch, stars, issues });
		},
	},
};

export { resolvers, typeDefs };
