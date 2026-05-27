import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

// 模拟API调用
const mockRegisterApi = async (username: string, email: string, password: string) => {
	// 在实际应用中，这里应该是真实的API调用
	return new Promise<{ token: string; user: { id: string; username: string; email: string } }>(
		(resolve, reject) => {
			setTimeout(() => {
				// 模拟邮箱已存在的情况
				if (email === 'test@example.com') {
					reject(new Error('该邮箱已被注册'));
					return;
				}

				resolve({
					token: 'mock-jwt-token',
					user: {
						id: '2',
						username,
						email,
					},
				});
			}, 500);
		},
	);
};

const Register: React.FC = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const login = useAuthStore((state: any) => state.login);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// 验证密码
		if (password !== confirmPassword) {
			setError('两次输入的密码不一致');
			return;
		}

		setLoading(true);

		try {
			const response = await mockRegisterApi(username, email, password);
			login(response.token, response.user);
			navigate('/dashboard');
		} catch (err) {
			setError(err instanceof Error ? err.message : '注册失败，请重试');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">注册新账户</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						或{' '}
						<Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
							登录已有账户
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
							<label htmlFor="username" className="sr-only">
								用户名
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="用户名"
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</div>
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="密码"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="confirm-password" className="sr-only">
								确认密码
							</label>
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="确认密码"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							{loading ? '注册中...' : '注册'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
