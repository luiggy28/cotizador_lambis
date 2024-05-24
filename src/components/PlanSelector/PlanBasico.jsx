import React, { useContext, useState, useEffect } from 'react';
import { TravelerContext } from '../Contexts/TravelerContext';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';

const PlanBasico = () => {
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
                const precioPorDia = 2000; 
                
                const precioTotal = (precioPorDia * diasDeViaje * travelerData.pasajeros * (1 - descuento)).toFixed(2);
                setPrecio(precioTotal);
            } else {
                console.error(`Fechas no válidas: fechaIda: ${travelerData.fechaIda}, fechaRetorno: ${travelerData.fechaRetorno}`);
            }
        }
    }, [travelerData.fechaIda, travelerData.fechaRetorno, travelerData.pasajeros, updateTravelerData]);

    
    const seleccionarPlan = () => {
        console.log("Plan Básico seleccionado");
        updateTravelerData({ ...travelerData, plan: 'basico', precio });
    };


    const detalleBeneficios = verDetalle ? (
        <>
            <Typography paragraph>Asistencia médica por accidente: 30.000 USD / EUR</Typography>
            <Typography paragraph>Atención médica por enfermedad: 30.000 USD / EUR</Typography>
            <Typography paragraph>Atención por COVID -19: 30.000 USD / EUR</Typography>
            <Typography paragraph>Telemedicina: APLICA</Typography>
            <Typography paragraph>Atención por especialista: APLICA</Typography>
            <Typography paragraph>Hospitalización: APLICA</Typography>
            <Typography paragraph>Exámenes complementarios: APLICA</Typography>
            <Typography paragraph>Línea de atención 24/7 (concierge): APLICA</Typography>
            <Typography paragraph>Medicamentos por atención ambulatoria: 200 USD / EUR</Typography>
            <Typography paragraph>Atención por enfermedad preexistente: 500 USD / EUR</Typography>
            <Typography paragraph>Eventos ginecológicos o urinarios: 100 USD / EUR</Typography>
            <Typography paragraph>Hotel por convalecencia, no aplica COVID - 19: 1.000 USD / EUR</Typography>
            <Typography paragraph>Retraso de vuelo: 100 USD / EUR</Typography>
            <Typography paragraph>Pérdida de equipaje: 380 USD / EUR</Typography>
            <Typography paragraph>Búsqueda de equipaje: APLICA</Typography>
            <Typography paragraph>Asesoría por pérdida de documentos: APLICA</Typography>
            <Typography paragraph>Odontología de urgencias: 250 USD / EUR</Typography>
            <Typography paragraph>Repatriación funeraria: 30.000 USD / EUR</Typography>
            <Typography paragraph>Repatriación sanitaria: 30.000 USD / EUR</Typography>
            <Typography paragraph>Reagrupación familiar: APLICA</Typography>
            <Typography paragraph>Transferencia de fondos: 500 USD / EUR</Typography>
            <Typography paragraph>Transferencia de fondos para fianza legal: 15.000 USD / EUR</Typography>
            <Typography paragraph>Monto máximo global: 30.000 USD / EUR</Typography>
            <Typography paragraph>Límite de edad: SIN LIMITES DE EDAD</Typography>
            <Typography paragraph>Copago: No Aplica</Typography>
            <Typography paragraph color="text.secondary">IMPORTANTE: La asistencia internacional es proveída por "ASSISTNETCARD", responsable del cumplimiento del servicio y el pago de gastos cubiertos.</Typography>
            <Typography paragraph color="text.secondary">La cobertura del seguro cumple con los requisitos de la UE (2004/17/EG).</Typography>
        </>
    ) : (
        <>
            <Typography>Asistencia médica por accidente: 30.000 USD / EUR</Typography>
            <Typography>Atención médica por enfermedad: 30.000 USD / EUR</Typography>
            <Typography>Atención por COVID -19: 30.000 USD / EUR</Typography>
            {/* Más detalles resumidos aquí */}
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

export default PlanBasico;