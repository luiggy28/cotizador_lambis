import React, { useContext, useState, useEffect } from 'react';
import { TravelerContext } from '../Contexts/TravelerContext';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';

const PlanPremium = () => {
    const { travelerData, updateTravelerData } = useContext(TravelerContext);
    const [verDetalle, setVerDetalle] = useState(false);
    const [precio, setPrecio] = useState("0.00");

    useEffect(() => {
        if (travelerData.fechaIda && travelerData.fechaRetorno) {
            const fechaIda = dayjs(travelerData.fechaIda);
            const fechaRetorno = dayjs(travelerData.fechaRetorno);
            if (fechaIda.isValid() && fechaRetorno.isValid()) {
                
                const diasDeViaje = fechaRetorno.diff(fechaIda, 'day') + 1;
                updateTravelerData({ ...travelerData, diasDeViaje });
                const descuento = travelerData.pasajeros > 2 ? 0.1 : 0;
                const precioPorDia = 3000; 
                
                const precioTotal = (precioPorDia * diasDeViaje * travelerData.pasajeros * (1 - descuento)).toFixed(2);
                setPrecio(precioTotal);
            } else {
                console.error(`Fechas no válidas: fechaIda: ${travelerData.fechaIda}, fechaRetorno: ${travelerData.fechaRetorno}`);
            }
        }
    }, [travelerData.fechaIda, travelerData.fechaRetorno, travelerData.pasajeros, updateTravelerData]);

    
    const seleccionarPlan = () => {
        console.log("Plan Premium seleccionado");
        updateTravelerData({ ...travelerData, plan: 'premium', precio });
    };



    const detalleBeneficios = verDetalle ? (
        <>
            <Typography paragraph>Eventos ginecológicos o urinarios: 150 USD / EUR</Typography>
            <Typography paragraph>Días complementarios por hospitalización: 3 DÍAS</Typography>
            <Typography paragraph>Demora de vuelos (más de 6 horas): 100 USD / EUR</Typography>
            <Typography paragraph>Pérdida de equipaje: 1,000 USD / EUR</Typography>
            <Typography paragraph>Pérdida de pasaporte: 75 USD / EUR</Typography>
            <Typography paragraph>Hotel por convalecencia (no aplica COVID-19): 3,000 USD / EUR</Typography>
            <Typography paragraph>Odontología de urgencias: 500 USD / EUR</Typography>
            <Typography paragraph>Traslado de emergencia: APLICA</Typography>
            <Typography paragraph>Repatriación sanitaria: 40,000 USD / EUR</Typography>
            <Typography paragraph>Repatriación funeraria: 40,000 USD / EUR</Typography>
            <Typography paragraph>Traslado de menores: 1,000 USD / EUR</Typography>
            <Typography paragraph>Traslado de un familiar por hospitalización: 600 USD / EUR</Typography>
            <Typography paragraph>Copago: NO APLICA</Typography>
            <Typography paragraph>Transferencia de fondos: 1,000 USD / EUR</Typography>
            <Typography paragraph>Transferencia de fondos para fianza legal: 15,000 USD / EUR</Typography>
            <Typography paragraph>Asistencia legal por accidente de tránsito: 5,000 USD / EUR</Typography>
            <Typography paragraph>Monto máximo global: 40,000 USD / EUR</Typography>
            <Typography paragraph>Límite de edad: 79 años</Typography>
            <Typography paragraph>Atención por Enfermedad Preexistente: 500 USD / EUR</Typography>
            <Typography paragraph color="text.secondary">IMPORTANTE: La asistencia internacional es proveída por "ASSISTNETCARD", responsable del cumplimiento del detalle del servicio y el pago de gastos cubiertos.</Typography>
            <Typography paragraph color="text.secondary">La cobertura del seguro cumple con los requisitos de la UE (2004/17/EG).</Typography>
        </>
    ) : (
        <>
            <Typography>Asistencia médica por accidente: 40,000 USD / EUR</Typography>
            <Typography>Atención médica por enfermedad: 40,000 USD / EUR</Typography>
            <Typography>Atención por COVID-19: 40,000 USD / EUR</Typography>
            <Typography>Telemedicina: APLICA</Typography>
            <Typography>Línea de atención 24/7 (concierge): APLICA</Typography>
            <Typography>Hospitalización: APLICA</Typography>
            <Typography>Atención por especialista: APLICA</Typography>
            <Typography>Exámenes complementarios: APLICA</Typography>
            <Typography>Medicamentos por atención ambulatoria: 500 USD / EUR</Typography>
        </>
    );

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Plan Premium</Typography>
                {detalleBeneficios}
                <Typography variant="h6">Precio: {precio}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setVerDetalle(!verDetalle)}>Ver detalle de este plan</Button>
                {/* Usar la función seleccionarPlan aquí */}
                <Button size="small" onClick={seleccionarPlan}>Seleccionar</Button>
            </CardActions>
        </Card>
    );
};

export default PlanPremium;