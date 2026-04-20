import React, { useState, useEffect } from "react";
import { useLogin } from "../../modules/login/login";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Card } from "../../components/Card";
import { ElegantAdminBackground } from "../../components/backgrounds/ElegantAdminBackground";
export default function LoginPage() {
	const { login, loading, error, user } = useLogin();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (success || user) {
			setTimeout(() => {
				navigate("/", { replace: true });
			}, 1200);
		}
	}, [success, user, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const user = await login(email, password);
		setSuccess(!!user);
	};

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				minHeight: "100vh",
				minWidth: "100vw",
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(0,0,0,0.02)",
			}}
		>
			<ElegantAdminBackground />
			<div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<Card
					style={{
						minWidth: 320,
						maxWidth: 420,
						width: "100%",
						background: "rgba(30, 42, 60, 0.45)",
						boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
						border: "1.5px solid rgba(255,255,255,0.18)",
						borderRadius: 22,
						padding: 40,
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						transition: "background 0.3s, box-shadow 0.3s",
					}}
				>
					<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
						<h2
							style={{
								textAlign: "center",
								marginBottom: 10,
								color: "#fff",
								fontWeight: 900,
								letterSpacing: 1,
								fontSize: 30,
								textShadow: "0 2px 16px #1976d299, 0 1px 0 #fff3",
								filter: "drop-shadow(0 2px 8px #1976d2aa)",
							}}
						>
							Iniciar sesión
						</h2>
						<Input
							type="email"
							label={<span style={{ color: '#fff', fontWeight: 600 }}>Correo electrónico</span>}
							placeholder="Ingresa tu correo"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							autoFocus
							style={{ border: "1.5px solid #1976d2", background: "rgba(255,255,255,0.13)", color: '#fff' }}
						/>
						<Input
							type="password"
							label={<span style={{ color: '#fff', fontWeight: 600 }}>Contraseña</span>}
							placeholder="Ingresa tu contraseña"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							style={{ border: "1.5px solid #1976d2", background: "rgba(255,255,255,0.13)", color: '#fff' }}
						/>
						<Button
							type="submit"
							disabled={loading}
							style={{
								marginTop: 8,
								background: "linear-gradient(90deg, #1976d2 60%, #ff9800 100%)",
								color: "#fff",
								fontWeight: 700,
								fontSize: 18,
								border: "none",
								borderRadius: 12,
								boxShadow: "0 2px 16px #1976d244, 0 1.5px 0 #fff3",
								transition: "background 0.2s",
								letterSpacing: 1,
							}}
						>
							{loading ? "Ingresando..." : "Entrar"}
						</Button>
						{error && <div style={{ color: "#ff9800", textAlign: "center", marginTop: 8, fontWeight: 600, textShadow: '0 1px 8px #fff8' }}>{error}</div>}
						{success && <div style={{ color: "#1976d2", textAlign: "center", marginTop: 8, fontWeight: 600, textShadow: '0 1px 8px #fff8' }}>¡Bienvenido!</div>}
					</form>
				</Card>
			</div>
		</div>
	);
}
