import React, { useState, useEffect } from 'react';
import { useTraveler } from '../Contexts/TravelerContext';
import FormViajero from './FormViajero';
import { Button, Box } from '@mui/material';

const Formulario = () => {
    const { travelerData, updateTravelerData, resetTravelersInfo } = useTraveler();
    const [viajeros, setViajeros] = useState([]);

    useEffect(() => {
        if (travelerData.pasajeros !== viajeros.length) {
            resetTravelersInfo(travelerData.pasajeros);
            setViajeros(travelerData.travelersInfo);
        }
    }, [travelerData.pasajeros, travelerData.travelersInfo, resetTravelersInfo]);

    const handleSetViajeroData = (index, data) => {
        const newViajeros = [...viajeros];
        newViajeros[index] = { ...newViajeros[index], ...data };
        setViajeros(newViajeros);
        updateTravelerData({ travelersInfo: newViajeros });
    };

    const allFieldsFilled = viajeros.every(v => v.nombre && v.apellido && v.documento && v.nacimiento);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (allFieldsFilled) {
            
            console.log('Datos de viajeros enviados:', viajeros);
        } else {
            console.log('Por favor completa todos los campos de cada viajero.');
        }
    };

    return (
        <div>
            <h1>Completa los datos de los viajeros</h1>
            <Box display="flex" alignItems="center" gap={2}>
                <Button variant="outlined" onClick={() => updateTravelerData({ pasajeros: Math.max(1, travelerData.pasajeros - 1) })}>-</Button>
                <span>{travelerData.pasajeros}</span>
                <Button variant="outlined" onClick={() => updateTravelerData({ pasajeros: travelerData.pasajeros + 1 })}>+</Button>
            </Box>
            <form onSubmit={handleSubmit}>
                {viajeros.map((viajero, index) => (
                    <FormViajero
                        key={index}
                        viajero={viajero}
                        setViajeroData={(data) => handleSetViajeroData(index, data)}
                    />
                ))}
                <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={!allFieldsFilled}>
                    Enviar
                </Button>
            </form>
        </div>
    );
};

export default Formulario;
