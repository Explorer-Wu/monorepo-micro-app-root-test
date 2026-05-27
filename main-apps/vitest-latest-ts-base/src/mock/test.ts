import Mock from 'mockjs';
// import { param2Obj } from '@/utils/index';

const count = 10;
const recordList: any[] = [];

for (let i = 0; i < count; i++) {
	recordList.push(
		Mock.mock({
			id: '@increment',
			create_time: '@datetime',
			'result|1': [1, 5, 15, 20, 30, 50, 100],
		}),
	);
}

export default {
	getTestData: () => ({
		code: 'success',
		data: {
			total: recordList.length,
			record: recordList,
		},
	}),
};
