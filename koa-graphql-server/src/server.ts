// import 'reflect-metadata';
import Koa from 'koa';
import Router from 'koa-router';
// import KoaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';

import './mongodb';
// import { connectDB } from './mongodb/index';
// import { integrateGraphql } from './graphql';

import { routerMap } from './router';

// const cors = require('koa2-cors');
// const jwt = require('koa-jwt');
import { typeDefs, resolvers } from './graphql/schema';

const appServ = new Koa();
const router = new Router();
const apollo = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
	await apollo.start();

	appServ.use(bodyParser());
	// appServ.use(KoaStatic(__dirname + '/static'));
	// 路由配置
	router.use(routerMap.routes());
	// 使用路由
	appServ.use(router.routes());
	appServ.use(router.allowedMethods());

	// 使用apollo
	appServ.use(apollo.getMiddleware());
	// apollo.applyMiddleware({
	// 	appServ,
	// 	// /graphql. Optionally provide this to match apollo-server.
	// 	path: '/',
	// });

	const port = process.env.PORT || 3601;
	// const dev = process.env.NODE_ENV !== 'production'; // 判断是否处于开发者状态

	// appServ.listen(port, () => {
	// });

	await new Promise((resolve: any) => appServ.listen(port, resolve));
	console.log(`🚀 GraphQL-demo server listen at http://localhost:${port}\n`);
	console.log(`🚀 > Server is starting at http://localhost:${port}${apollo.graphqlPath}`);
}

startApolloServer();

// server.on('error', (err: any, ctx: any) => {
// 	console.error('server-error:', err, ctx);

// 	const status = err.statusCode || err.status || 500;
// 	ctx.status = status;

// 	// if (ctx.headers['x-requested-with'] !== 'XMLHttpRequest') {
// 	if (status === 401) {
// 		// you need to return here or next if statement will be in codepath
// 		ctx.redirect('/login');
// 	} else {
// 		ctx.throw(status, 'error', {
// 			status: status,
// 			error: err,
// 		});
// 	}
// 	// }

// 	// if (ctx.status === 404) {
// 	//   await ctx.throw(status, 'error', {
// 	//     status: status,
// 	//     error: err
// 	//   });
// 	// }
// });
