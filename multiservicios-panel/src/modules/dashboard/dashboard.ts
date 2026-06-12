import { useEffect, useState } from "react";
import { DashboardSummary } from "../../interfaces/dashboard/useDashboard";

export function useDashboardSummary() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/dashboard/summary', {
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Error al obtener datos del dashboard');
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}