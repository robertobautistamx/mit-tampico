import React, { useState } from "react";

export interface LoginResponse {
	id: number;
	nombre: string;
	email: string;
	rol: 'admin' | 'empleado';
	activo: boolean;
	created_at: string;
}

export interface LoginState {
	loading: boolean;
	error: string | null;
	user: LoginResponse | null;
}

export function useLogin() {
	const [state, setState] = useState<LoginState>(() => {
		const stored = localStorage.getItem('user');
		return {
			loading: false,
			error: null,
			user: stored ? JSON.parse(stored) : null,
		};
	});

		const login = async (email: string, password: string) => {
			setState(s => ({ ...s, loading: true, error: null }));
			try {
				const res = await fetch("http://localhost:3000/api/v1/usuarios/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});
				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					throw new Error(data.message || "Credenciales inválidas");
				}
				const user: LoginResponse = await res.json();
				localStorage.setItem('user', JSON.stringify(user));
				setState({ loading: false, error: null, user });
				return user;
			} catch (err: any) {
				setState(s => ({ ...s, loading: false, error: err.message || "Error de red" }));
				return null;
			}
		};

		const logout = () => {
			localStorage.removeItem('user');
			setState({ loading: false, error: null, user: null });
		};

	return { ...state, login, logout };
}