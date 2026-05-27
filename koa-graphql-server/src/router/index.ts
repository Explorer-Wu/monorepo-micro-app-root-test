import { saveTechInfo, fetchTechInfo } from '../controllers/techinfo';
import { saveTechnology, fetchTechnology, fetchTechnologyDetail } from '../controllers/technology';
import { saveAppClasses, fetchAppClasses } from '../controllers/appclasses';

import Router from 'koa-router';

const routerMap = new Router();

routerMap
	.post('/saveinfo', saveTechInfo)
	.get('/techinfos', fetchTechInfo)
	.post('/savetechnology', saveTechnology)
	.get('/technology', fetchTechnology)
	.get('/techdetail', fetchTechnologyDetail)
	.post('/saveapps', saveAppClasses)
	.get('/apps', fetchAppClasses);

export { routerMap };

/**
 * 在 Commonjs 规范里，没有像 ESModule 能形成闭包的「模块」概念，所有的模块在引用时都默认被抛至全局
 * 因此当再次声明某个模块时，TypeScript 会认为重复声明了两次相同的变量进而抛错。
 * 最简单的解决方法是在报错的文件底部添加一行代码：export {}。
 * 这行代码会「欺骗」tslint 使其认为当前文件是一个 ESModule 模块，因此不存在变量重复声明的可能性。
 * tsconfig.json中配置 esMoudleInterop 为true, 允许文件中出现 export 关键字。
 */
// export {};
