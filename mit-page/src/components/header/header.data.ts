export const navItems = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'acerca', label: 'ACERCA DE' },
  { 
    id: 'servicios', 
    label: 'SERVICIOS', 
    subItems: [
      { id: 'refrigeracion', hash: 'servicio-refrigeracion', label: 'Refrigeración' },
      { id: 'sistemas-informaticos', hash: 'servicio-sistemas', label: 'Sistemas Informáticos' },
      { id: 'electricidad', hash: 'servicio-electricidad', label: 'Electricidad' }
    ]
  },
  { id: 'proyectos', label: 'PROYECTOS' },
];