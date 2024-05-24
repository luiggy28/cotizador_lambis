import React, { useState, useEffect } from 'react';
import { useTraveler } from '../Contexts/TravelerContext';
import FormViajero from './FormViajero';
import { Button, Box, Typography } from '@mui/material';

const Formulario = () => {
    const { travelerData, updateTravelerData } = useTraveler();
    const [viajeros, setViajeros] = useState(travelerData.travelersInfo);
    const [error, setError] = useState('');

    useEffect(() => {
        if (travelerData.pasajeros !== viajeros.length) {
            const newViajeros = [...viajeros];
            if (travelerData.pasajeros > viajeros.length) {
                for (let i = viajeros.length; i < travelerData.pasajeros; i++) {
                    newViajeros.push({ nombre: '', apellido: '', documento: '', nacimiento: null, edadDelViajero: null });
                }
            } else {
                newViajeros.length = travelerData.pasajeros;
            }
            setViajeros(newViajeros);
            updateTravelerData({ travelersInfo: newViajeros });
        }
    }, [travelerData.pasajeros]);

    const handleSetViajeroData = (index, data) => {
        const newViajeros = [...viajeros];
        newViajeros[index] = { ...newViajeros[index], ...data };

        setViajeros(newViajeros);
        updateTravelerData({ travelersInfo: newViajeros });

        const nombresCompletosUnicos = new Set(newViajeros.map(v => v.nombre + v.apellido)).size === newViajeros.length;
        const documentosUnicos = new Set(newViajeros.map(v => v.documento)).size === newViajeros.length;

        if (!nombresCompletosUnicos || !documentosUnicos) {
            setError('La combinación de nombre y apellido, y los números de documentos deben ser únicos.');
        } else {
            setError('');
        }
    };

    const allFieldsFilled = viajeros.every(v => v.nombre && v.apellido && v.documento && v.nacimiento);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (allFieldsFilled && !error) {
            console.log('Datos de viajeros enviados:', viajeros);
        } else {
            console.log('Por favor completa todos los campos de cada viajero y asegúrate de que los nombres completos y documentos sean únicos.');
        }
    };

    const incrementPasajeros = () => {
        if (travelerData.pasajeros < 9) {
            updateTravelerData({ pasajeros: travelerData.pasajeros + 1 });
        }
    };

    const decrementPasajeros = () => {
        if (travelerData.pasajeros > 1) {
            updateTravelerData({ pasajeros: travelerData.pasajeros - 1 });
        }
    };

    return (
        <div>
            <h1>Completa los datos de los viajeros</h1>
            <Box display="flex" alignItems="center" gap={2}>
                <Button variant="outlined" onClick={decrementPasajeros}>-</Button>
                <span>{travelerData.pasajeros}</span>
                <Button variant="outlined" onClick={incrementPasajeros}>+</Button>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                {viajeros.map((viajero, index) => (
                    <FormViajero
                        key={index}
                        viajero={viajero}
                        setViajero={(data) => handleSetViajeroData(index, data)}
                    />
                ))}
                <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={!allFieldsFilled || !!error}>
                    Enviar
                </Button>
            </form>
        </div>
    );
};

export default Formulario;
