import React, { useEffect, useMemo, useState } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, 
  Alert, CircularProgress, List, ListItem, ListItemText, 
  Divider, Chip, Button, ListItemAvatar, Avatar
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import ThunderstormRoundedIcon from '@mui/icons-material/ThunderstormRounded';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { useProductos } from '../../modules/products/product';
import { useCategorias } from '../../modules/category/category';
import { useLogin } from '../../modules/login/login';

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BAR_GRADIENTS = [
  { id: 'bar1', start: '#60a5fa', end: '#2563eb' },
  { id: 'bar2', start: '#34d399', end: '#059669' },
  { id: 'bar3', start: '#fbbf24', end: '#d97706' },
  { id: 'bar4', start: '#a78bfa', end: '#7c3aed' },
  { id: 'bar5', start: '#f472b6', end: '#db2777' }
];

// Datos simulados para la bitácora (hasta que conectes tu hook useBitacora)
const bitacoraMock = [
  { id: 1, accion: 'Creó el producto "Filtro de Aceite"', usuario: 'Admin', tiempo: 'Hace 2 horas', color: '#10b981' },
  { id: 2, accion: 'Actualizó el stock de "Bujías NGK"', usuario: 'Empleado', tiempo: 'Hace 4 horas', color: '#3b82f6' },
  { id: 3, accion: 'Eliminó la categoría "Llantas"', usuario: 'Admin', tiempo: 'Ayer', color: '#ef4444' },
  { id: 4, accion: 'Creó el usuario "Juan Pérez"', usuario: 'Admin', tiempo: 'Ayer', color: '#8b5cf6' },
];

const Dashboard: React.FC = () => {
  const { productos, loading: loadingProd, fetchProductos } = useProductos();
  const { categorias, loading: loadingCat, fetchCategorias } = useCategorias();
  const [weather, setWeather] = useState<{ temp: number; city: string; isDay: boolean; code: number } | null>(() => {
    const saved = localStorage.getItem('dashboard_weather');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });
  const navigate = useNavigate();
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  // --- Extraer el nombre del usuario de la sesión ---
  const { user } = useLogin();
  const userName = useMemo(() => {
    let parsedUser = user;
    if (typeof user === 'string') {
      try { parsedUser = JSON.parse(user); } catch (e) {}
    }
    let userData = (parsedUser as any)?.user || (parsedUser as any)?.usuario || (parsedUser as any)?.data || parsedUser;
    if (Array.isArray(userData)) userData = userData[0];
    else if (Array.isArray(parsedUser)) userData = parsedUser[0];
    const fullName = userData?.nombre || userData?.name || userData?.username || userData?.email || 'Usuario';
    return fullName.split(' ')[0]; // Toma solo el primer nombre
  }, [user]);

  // Recargar los datos cuando el usuario entre al Dashboard
  useEffect(() => {
    fetchProductos();
    fetchCategorias();

    // Obtener el clima de Tampico (lat 22.216, lon -97.85)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=22.216&longitude=-97.85&current_weather=true&timezone=America%2FMonterrey')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const newWeather = {
            temp: Math.round(data.current_weather.temperature),
            city: 'Tampico, Tamps.',
            isDay: data.current_weather.is_day === 1,
            code: data.current_weather.weathercode
          };
          setWeather(newWeather);
          localStorage.setItem('dashboard_weather', JSON.stringify(newWeather));
        }
      }).catch(err => console.error('Error al cargar clima:', err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Procesamiento de métricas y estadísticas
  const { 
    totalProductos, 
    totalCategorias, 
    valorInventario, 
    productosSinStock, 
    productosPocoStock, 
    prodPorCategoria,
    stockStatusData,
    topValuedProducts
  } = useMemo(() => {
    let valorInventario = 0;
    const sinStock: typeof productos = [];
    const pocoStock: typeof productos = [];
    
    productos.forEach(p => {
      valorInventario += (Number(p.precio) * Number(p.stock));
      if (p.stock === 0) sinStock.push(p);
      else if (p.stock > 0 && p.stock <= 5) pocoStock.push(p);
    });

    const prodPorCategoria = categorias.map(cat => ({
      nombre: cat.nombre,
      cantidad: productos.filter(p => p.categoria_id === cat.id).length
    })).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5); // Top 5

    // Top 5 productos que representan mayor dinero invertido
    const topValuedProducts = [...productos]
      .map(p => ({ nombre: p.nombre, valor: Number(p.precio) * Number(p.stock) }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);

    const stockStatusData = [
      { name: 'En Stock', value: productos.length - sinStock.length - pocoStock.length, color: 'url(#colorStock)' },
      { name: 'Poco Stock', value: pocoStock.length, color: 'url(#colorPoco)' },
      { name: 'Agotado', value: sinStock.length, color: 'url(#colorAgotado)' }
    ].filter(d => d.value > 0);

    return { 
      totalProductos: productos.length, 
      totalCategorias: categorias.length, 
      valorInventario, 
      productosSinStock: sinStock.sort((a, b) => a.nombre.localeCompare(b.nombre)), 
      productosPocoStock: pocoStock.sort((a, b) => a.stock - b.stock), 
      prodPorCategoria,
      stockStatusData,
      topValuedProducts
    };
  }, [productos, categorias]);

  // ─── Determinar colores e íconos dinámicos del clima ──────────────────────
  const weatherUI = useMemo(() => {
    if (!weather) return null;
    const { code, isDay } = weather;
    
    // Default: Soleado / Despejado (códigos 0, 1)
    let icon = isDay ? <WbSunnyRoundedIcon sx={{ fontSize: 36, color: '#f59e0b' }} /> : <DarkModeRoundedIcon sx={{ fontSize: 36, color: '#5b21b6' }} />;
    let bgGradient = isDay ? 'linear-gradient(135deg, rgba(224,242,254,0.85) 0%, rgba(186,230,253,0.95) 100%)' : 'linear-gradient(135deg, rgba(237,233,254,0.85) 0%, rgba(196,181,253,0.95) 100%)';
    let color = isDay ? '#0369a1' : '#4338ca';
    let bgImg = isDay ? 'url("https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1000&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=1000&auto=format&fit=crop")';

    if (code === 2 || code === 3 || code === 45 || code === 48) {
      // Nublado / Niebla
      icon = <CloudRoundedIcon sx={{ fontSize: 36, color: isDay ? '#64748b' : '#94a3b8' }} />;
      bgGradient = isDay ? 'linear-gradient(135deg, rgba(241,245,249,0.85) 0%, rgba(226,232,240,0.95) 100%)' : 'linear-gradient(135deg, rgba(51,65,85,0.85) 0%, rgba(15,23,42,0.95) 100%)';
      color = isDay ? '#334155' : '#f8fafc';
      bgImg = isDay ? 'url("https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=1000&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=1000&auto=format&fit=crop")';
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      // Lluvia / Llovizna
      icon = <WaterDropRoundedIcon sx={{ fontSize: 36, color: isDay ? '#2563eb' : '#60a5fa' }} />;
      bgGradient = isDay ? 'linear-gradient(135deg, rgba(219,234,254,0.85) 0%, rgba(191,219,254,0.95) 100%)' : 'linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(23,37,84,0.95) 100%)';
      color = isDay ? '#1e3a8a' : '#eff6ff';
      bgImg = isDay ? 'url("https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1000&auto=format&fit=crop")';
    } else if (code >= 95 && code <= 99) {
      // Tormenta Eléctrica
      icon = <ThunderstormRoundedIcon sx={{ fontSize: 36, color: '#fbbf24' }} />;
      bgGradient = isDay ? 'linear-gradient(135deg, rgba(148,163,184,0.85) 0%, rgba(100,116,139,0.95) 100%)' : 'linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(2,6,23,0.95) 100%)';
      color = '#f8fafc';
      bgImg = 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?q=80&w=1000&auto=format&fit=crop")';
    }
    return { icon, bg: `${bgGradient}, ${bgImg}`, color };
  }, [weather]);

  if (loadingProd || loadingCat) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flex: 1 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, flex: 1 }}>
      <Container maxWidth="xl">
        <Card 
          elevation={0} 
          sx={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 3,
            borderRadius: 3, px: 4, py: 3,
            background: weatherUI ? weatherUI.bg : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: weatherUI ? weatherUI.color : '#0f172a',
            border: weatherUI ? 'none' : '1px solid rgba(226, 232, 240, 1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
              ¡Bienvenido, {userName}! 👋
            </Typography>
            <Typography sx={{ opacity: 0.8, fontWeight: 500, fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: '1.05rem' }}>
              Aquí tienes el resumen de tu negocio para hoy.
            </Typography>
          </Box>
          
          {weatherUI && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {weatherUI.icon}
              <Box sx={{ ml: 1.5 }}>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>{weather?.temp}°C</Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8, mt: 0.5 }}>{weather?.city}</Typography>
              </Box>
            </Box>
          )}
        </Card>

        {/* Accesos Directos (Quick Actions) */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.05s' }}>
          <Button 
            variant="contained" 
            startIcon={<AddCircleOutlineRoundedIcon />} 
            onClick={() => navigate('/catalogo/productos')}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: '#2563eb', boxShadow: 'none', '&:hover': { bgcolor: '#1d4ed8', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' } }}
          >
            Nuevo Producto
          </Button>
          <Button 
            variant="contained" 
            startIcon={<CategoryRoundedIcon />} 
            onClick={() => navigate('/catalogo/categorias')}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: '#8b5cf6', boxShadow: 'none', '&:hover': { bgcolor: '#7c3aed', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)' } }}
          >
            Nueva Categoría
          </Button>
          <Button 
            variant="contained" 
            startIcon={<PersonAddAlt1RoundedIcon />} 
            onClick={() => navigate('/usuarios')}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: '#10b981', boxShadow: 'none', '&:hover': { bgcolor: '#059669', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' } }}
          >
            Nuevo Usuario
          </Button>
        </Box>

        {productosSinStock.length > 0 && (
          <Alert 
            severity="error" 
            icon={<ErrorOutlineRoundedIcon fontSize="inherit" />}
            sx={{ mb: 4, borderRadius: 3, fontWeight: 500, '& .MuiAlert-message': { width: '100%' } }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>¡Atención! Productos agotados</Typography>
            Tienes {productosSinStock.length} {productosSinStock.length === 1 ? 'producto' : 'productos'} sin existencias. Revisa el inventario pronto.
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* KPI 1: Productos */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.1s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', mr: 2 }}>
                  <Inventory2RoundedIcon />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Productos</Typography>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{totalProductos}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* KPI 2: Categorías */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.2s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(168, 85, 247, 0.1)', color: '#9333ea', mr: 2 }}>
                  <CategoryRoundedIcon />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Categorías Activas</Typography>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{totalCategorias}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* KPI 3: Valor Inventario */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.3s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', mr: 2 }}>
                  <AttachMoneyRoundedIcon />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Valor de Inventario</Typography>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>
                    ${valorInventario.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* KPI 4: Alertas Stock */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.4s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', mr: 2 }}>
                  <WarningAmberRoundedIcon />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Por Agotarse</Typography>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{productosPocoStock.length}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Secciones detalladas */}
        <Grid container spacing={3}>
          {/* Gráfica Interactiva de Categorías */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.5s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', mb: 3 }}>
                  Distribución por Categorías
                </Typography>
                {prodPorCategoria.length === 0 ? (
                  <Typography sx={{ color: '#64748b', textAlign: 'center', py: 4 }}>Aún no hay productos categorizados.</Typography>
                ) : (
                  <Box sx={{ 
                    width: '100%', 
                    height: 320, 
                    '& *:focus': { outline: 'none !important' }
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prodPorCategoria} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          {BAR_GRADIENTS.map((grad) => (
                            <linearGradient key={grad.id} id={grad.id} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={grad.start} stopOpacity={1}/>
                              <stop offset="100%" stopColor={grad.end} stopOpacity={1}/>
                            </linearGradient>
                          ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
                        <RechartsTooltip 
                          cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: 600, padding: '10px 14px' }}
                          itemStyle={{ color: '#0f172a' }}
                        />
                        <Bar 
                          dataKey="cantidad" 
                          radius={[6, 6, 0, 0]} 
                          barSize={40}
                          name="Productos"
                          animationDuration={1500}
                          animationEasing="ease-out"
                          onMouseEnter={(_, index) => setActiveBarIndex(index)}
                          onMouseLeave={() => setActiveBarIndex(null)}
                        >
                          {prodPorCategoria.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`url(#${BAR_GRADIENTS[index % BAR_GRADIENTS.length].id})`} 
                              style={{ 
                                opacity: activeBarIndex === null || activeBarIndex === index ? 1 : 0.25,
                                filter: activeBarIndex === null || activeBarIndex === index ? 'grayscale(0%)' : 'grayscale(100%)',
                                transition: 'all 0.4s ease-in-out', 
                                cursor: 'pointer', 
                                outline: 'none' 
                              }}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Gráfica de Estado de Stock */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.6s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', mb: 3 }}>
                  Estado del Inventario
                </Typography>
                {stockStatusData.length === 0 ? (
                  <Typography sx={{ color: '#64748b', textAlign: 'center', py: 4 }}>No hay datos de inventario.</Typography>
                ) : (
                  <Box sx={{ 
                    width: '100%', 
                    height: 320, 
                    '& *:focus': { outline: 'none !important' }
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <linearGradient id="colorStock" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                          </linearGradient>
                          <linearGradient id="colorPoco" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#d97706" stopOpacity={1}/>
                          </linearGradient>
                          <linearGradient id="colorAgotado" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f87171" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#dc2626" stopOpacity={1}/>
                          </linearGradient>
                        </defs>
                        <Pie
                          data={stockStatusData}
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                          animationDuration={1500}
                          animationEasing="ease-out"
                          onMouseEnter={(_, index) => setActivePieIndex(index)}
                          onMouseLeave={() => setActivePieIndex(null)}
                        >
                          {stockStatusData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              style={{ 
                                opacity: activePieIndex === null || activePieIndex === index ? 1 : 0.25,
                                filter: activePieIndex === null || activePieIndex === index ? 'grayscale(0%)' : 'grayscale(100%)',
                                transform: activePieIndex === index ? 'scale(1.05)' : 'scale(1)',
                                transformOrigin: 'center',
                                transition: 'all 0.4s ease-in-out', 
                                cursor: 'pointer', 
                                outline: 'none' 
                              }}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '10px 14px' }}
                          itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Nueva Gráfica de Área: Top Valor de Inventario */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.7s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', mb: 3 }}>
                  Top 5 Productos (Valor en Inventario)
                </Typography>
                {topValuedProducts.length === 0 ? (
                  <Typography sx={{ color: '#64748b', textAlign: 'center', py: 4 }}>No hay suficientes datos.</Typography>
                ) : (
                  <Box sx={{ 
                    width: '100%', 
                    height: 320, 
                    '& *:focus': { outline: 'none !important' } 
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={topValuedProducts} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val}`} />
                        <RechartsTooltip 
                          cursor={{ stroke: 'rgba(15, 23, 42, 0.1)', strokeWidth: 2, strokeDasharray: '4 4' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '10px 14px' }}
                          itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                          formatter={(value: any) => [`$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Valor total']}
                        />
                        <Area 
                          type="monotone" dataKey="valor" stroke="#10b981" strokeWidth={4} 
                          fillOpacity={1} fill="url(#colorValor)" 
                          animationDuration={1500} animationEasing="ease-out" 
                          activeDot={{ r: 7, strokeWidth: 0, fill: '#10b981', style: { filter: 'drop-shadow(0px 4px 6px rgba(16, 185, 129, 0.5))' } }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Productos con bajo stock reacomodados al lado de la nueva gráfica */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.8s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)', height: '100%' }}>
              <CardContent sx={{ p: 0 }}>
                <Typography sx={{ p: 3, pb: 1, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Productos con bajo stock
                </Typography>
                {productosPocoStock.length === 0 ? (
                  <Typography sx={{ px: 3, py: 4, color: '#64748b', textAlign: 'center' }}>Todos tus productos tienen buen nivel de existencias.</Typography>
                ) : (
                  <List sx={{ pt: 0 }}>
                    {productosPocoStock.slice(0, 6).map((prod, index) => (
                      <React.Fragment key={prod.id}>
                        <ListItem sx={{ px: 3, py: 1.5 }}>
                          <ListItemText 
                            primary={<Typography sx={{ fontWeight: 600, color: '#1e293b' }}>{prod.nombre}</Typography>}
                            secondary={`Precio: $${Number(prod.precio).toFixed(2)}`}
                          />
                          <Chip 
                            label={`${prod.stock} en stock`} 
                            size="small" 
                            color={prod.stock <= 2 ? 'error' : 'warning'} 
                            sx={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        {index < productosPocoStock.length - 1 && index < 5 && <Divider sx={{ mx: 3 }} />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Últimos Movimientos (Bitácora) en fila completa */}
          <Grid size={{ xs: 12 }} sx={{ animation: `${fadeUp} 0.6s ease-out both`, animationDelay: '0.9s' }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)', height: '100%' }}>
              <CardContent sx={{ p: 0 }}>
                <Typography sx={{ p: 3, pb: 1, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HistoryRoundedIcon sx={{ color: '#64748b' }} />
                  Últimos Movimientos
                </Typography>
                <List sx={{ pt: 0 }}>
                  {bitacoraMock.map((log, index) => (
                    <React.Fragment key={log.id}>
                      <ListItem sx={{ px: 3, py: 2 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: `${log.color}20`, color: log.color, width: 40, height: 40, fontWeight: 700, fontSize: '1rem' }}>
                            {log.usuario.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>{log.accion}</Typography>}
                          secondary={
                            <Typography sx={{ color: '#64748b', fontSize: '0.8rem', mt: 0.5 }}>
                              Por <span style={{ fontWeight: 600 }}>{log.usuario}</span> • {log.tiempo}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < bitacoraMock.length - 1 && <Divider sx={{ mx: 3 }} />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
