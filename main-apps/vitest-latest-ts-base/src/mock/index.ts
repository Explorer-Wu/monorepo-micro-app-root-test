import Mock from 'mockjs';
// import loginAPI from './login'
import testAPI from './test';

// 目前，接口 Mock.setup( settings ) 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。
// timeout值可以是正整数，例如400，表示 400 毫秒 后才会返回响应内容；
// 也可以是横杠 '-' 风格的字符串，例如 '200-600'，表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。
// Mock.setup({
//   timeout: '100-500'
// })

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)

Mock.mock(/\/api\/articles\/$/, 'get', testAPI.getTestData);

export default Mock;
