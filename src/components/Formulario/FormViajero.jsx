import React from 'react';
import { TextField, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FormViajero = ({ viajero, setViajero }) => {
    const handleChange = (prop) => (event) => {
        setViajero({ ...viajero, [prop]: event.target.value.toUpperCase() });
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? date.format('DD-MM-YYYY') : null;
        const age = date ? dayjs().diff(date, 'year') : null;
        setViajero({ ...viajero, nacimiento: formattedDate, edadDelViajero: age });
    };

    return (
        <Box component="div" sx={{ mt: 1 }}>
            <TextField
                label="Nombre"
                value={viajero.nombre}
                onChange={handleChange('nombre')}
                fullWidth
                required
            />
            <TextField
                label="Apellido"
                value={viajero.apellido}
                onChange={handleChange('apellido')}
                fullWidth
                required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha de Nacimiento"
                    value={viajero.nacimiento ? dayjs(viajero.nacimiento, 'DD-MM-YYYY') : null}
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                />
            </LocalizationProvider>
            <TextField
                label="Pasaporte / DNI"
                value={viajero.documento}
                onChange={handleChange('documento')}
                fullWidth
                required
            />
        </Box>
    );
};

export default FormViajero;
    