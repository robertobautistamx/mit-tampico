import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

export type TableActionItem = {
  key: string;
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  disabled?: boolean;
};

type TableActionButtonsProps = {
  actions: TableActionItem[];
};

const TableActionButtons: React.FC<TableActionButtonsProps> = ({ actions }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75 }}>
      {actions.map((action) => (
        <Tooltip key={action.key} title={action.label}>
          <span>
            <IconButton
              size="small"
              onClick={action.onClick}
              disabled={action.disabled}
              color={action.color ?? 'default'}
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: action.color === 'error' ? 'rgba(239, 68, 68, 0.20)' : 'rgba(148, 163, 184, 0.18)',
                bgcolor: action.color === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(37, 99, 235, 0.06)',
                '&:hover': {
                  bgcolor: action.color === 'error' ? 'rgba(239, 68, 68, 0.16)' : 'rgba(37, 99, 235, 0.12)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 160ms ease',
              }}
            >
              {action.icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Box>
  );
};

export default TableActionButtons;