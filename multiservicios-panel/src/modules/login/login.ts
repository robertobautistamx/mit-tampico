import { useState } from "react";
import { LoginResponse, LoginState } from "../../interfaces/login/useLogin";

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
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      setState(s => ({ ...s, loading: false, error: 'Email y contraseña son requeridos' }));
      return null;
    }

    if (!email.includes('@') || email.trim() === '') {
      setState(s => ({ ...s, loading: false, error: 'Email inválido' }));
      return null;
    }

    setState(s => ({ ...s, loading: true, error: null }));
    
    try {
      const res = await fetch('/api/v1/usuarios/login', { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', 
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const text = await res.text();
      let jsonBody: any = null;
      try { jsonBody = text ? JSON.parse(text) : null; } catch (e) { jsonBody = null; }

      if (!res.ok) {
        const serverMessage = jsonBody?.message || jsonBody?.error || res.statusText || 'Credenciales inválidas';
        setState(s => ({ ...s, loading: false, error: serverMessage }));
        return null;
      }

      const user: LoginResponse = jsonBody as LoginResponse;
      localStorage.setItem('user', JSON.stringify(user));
      setState({ loading: false, error: null, user });
      return user;
    } catch (err: any) {
      const message = err?.message || 'Error de conexión. Intente nuevamente.';
      setState(s => ({ ...s, loading: false, error: message }));
      return null;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setState({ loading: false, error: null, user: null });
  };

  return { ...state, login, logout };
}