import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FormViajero = ({ viajero, setViajero }) => {
    
    const handleChange = (prop) => (event) => {
        setViajero({ ...viajero, [prop]: event.target.value });
    };

    const handleDateChange = (date) => {
        setViajero({ ...viajero, nacimiento: date });
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
                    value={viajero.nacimiento}
                    onChange={(newValue) => {
                        setViajero({ ...viajero, nacimiento: newValue });
                    }}
                    components={{
                        TextField: (props) => (
                            <TextField
                                {...props}
                                fullWidth
                                required
                            />
                        ),
                    }}
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