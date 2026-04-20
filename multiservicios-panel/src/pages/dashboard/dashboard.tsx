import React from "react";

export default function Dashboard() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1976d2', marginBottom: 16 }}>
        Bienvenido al Dashboard
      </h1>
      <p style={{ fontSize: 18, color: '#333' }}>
        Aquí puedes ver estadísticas, accesos rápidos y más información relevante.
      </p>
      {/* Aquí puedes agregar widgets, gráficas, accesos rápidos, etc. */}
    </div>
  );
}
