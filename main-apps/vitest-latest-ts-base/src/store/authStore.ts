import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	token: string | null;
	user: {
		id?: string;
		username?: string;
		email?: string;
	} | null;
	isAuthenticated: boolean;
	login: (token: string, user: AuthState['user']) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			token: null,
			user: null,
			isAuthenticated: false,
			login: (token, user) => set({ token, user, isAuthenticated: true }),
			logout: () => set({ token: null, user: null, isAuthenticated: false }),
		}),
		{
			name: 'auth-storage', // 持久化存储的名称
		},
	),
);
