import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

// 模拟API调用
const mockLoginApi = async (email: string, password: string) => {
	// 在实际应用中，这里应该是真实的API调用
	return new Promise<{ token: string; user: { id: string; username: string; email: string } }>(
		(resolve, reject) => {
			setTimeout(() => {
				if (email === 'test@example.com' && password === 'password') {
					resolve({
						token: 'mock-jwt-token',
						user: {
							id: '1',
							username: '测试用户',
							email: 'test@example.com',
						},
					});
				} else {
					reject(new Error('邮箱或密码不正确'));
				}
			}, 500);
		},
	);
};

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const login = useAuthStore((state: any) => state.login);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const response = await mockLoginApi(email, password);
			login(response.token, response.user);
			navigate('/dashboard');
		} catch (err) {
			setError(err instanceof Error ? err.message : '登录失败，请重试');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">登录您的账户</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						或{' '}
						<Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
							注册新账户
						</Link>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="rounded-md bg-red-50 p-4">
							<div className="text-sm text-red-700">{error}</div>
						</div>
					)}
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								邮箱地址
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="邮箱地址"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								密码
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="密码"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
								记住我
							</label>
						</div>

						<div className="text-sm">
							<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
								忘记密码?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							{loading ? '登录中...' : '登录'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
