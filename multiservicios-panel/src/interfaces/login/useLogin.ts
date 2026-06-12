
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