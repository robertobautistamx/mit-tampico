import React from 'react';
import { Box, Typography, FormControlLabel, Switch, Paper } from '@mui/material';
import { useColorMode } from '../../theme/ThemeProvider';

const GeneralSettings: React.FC = () => {
	const { mode, toggleColorMode } = useColorMode();

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>Ajustes generales</Typography>

			<Paper sx={{ p: 2, maxWidth: 560 }} elevation={0}>
				<FormControlLabel
					control={(
						<Switch
							checked={mode === 'dark'}
							onChange={() => toggleColorMode()}
							color="primary"
						/>
					)}
					label={mode === 'dark' ? 'Modo oscuro' : 'Modo claro'}
				/>

				<Box sx={{ mt: 2 }}>
					<Typography variant="body2" color="text.secondary">
						El tema se guarda en el navegador y se aplica en toda la aplicación.
					</Typography>
				</Box>
			</Paper>
		</Box>
	);
};

export default GeneralSettings;
