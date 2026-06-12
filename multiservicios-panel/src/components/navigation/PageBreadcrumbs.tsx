import React, { useMemo } from 'react';
import { Box, Link, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { RUTAS_CONFIG } from '../../routers/rutasConfig';

type BreadcrumbItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

function resolveBreadcrumb(pathname: string): BreadcrumbItem[] {
  const home: BreadcrumbItem = {
    label: 'Inicio',
    path: '/dashboard',
    icon: <HomeRoundedIcon sx={{ fontSize: 16 }} />,
  };

  const exactMatch = RUTAS_CONFIG
    .flatMap((group) => group.categorias.map((item) => ({ group, item })))
    .find(({ item }) => item.ruta === pathname);

  if (!exactMatch) {
    return [home];
  }

  return [
    home,
    {
      label: exactMatch.item.opcion,
      path: exactMatch.item.ruta ?? pathname,
      icon: exactMatch.item.icono ? React.createElement(exactMatch.item.icono, { sx: { fontSize: 16 } }) : undefined,
    },
  ];
}

const PageBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(() => resolveBreadcrumb(location.pathname), [location.pathname]);

  if (items.length === 1 && location.pathname === '/dashboard') {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, px: { xs: 2, md: 4 }, pt: { xs: 2, md: 3 }, pb: 0.5 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={`${item.label}-${item.path}`}>
            {index > 0 && (
              <ChevronRightRoundedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
            )}
            <Link
              component="button"
              onClick={() => navigate(item.path)}
              underline="none"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                color: isLast ? 'text.primary' : 'text.secondary',
                fontWeight: isLast ? 700 : 500,
                fontSize: '0.85rem',
                lineHeight: 1,
                transition: 'color 160ms ease, transform 160ms ease',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {item.icon}
              <Typography component="span" sx={{ font: 'inherit' }}>
                {item.label}
              </Typography>
            </Link>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default PageBreadcrumbs;