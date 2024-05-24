import React, { useContext, useEffect, useState } from 'react';
import { TravelerContext } from '../Contexts/TravelerContext';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const PlanPremium = () => {
    const { travelerData, updateTravelerData } = useContext(TravelerContext);
    const [verDetalle, setVerDetalle] = useState(false);
    const [precio, setPrecio] = useState("0");
    const [precioSinDescuento, setPrecioSinDescuento] = useState("0");
    const [descuentoAplicado, setDescuentoAplicado] = useState(false);
    const [descuentoTexto, setDescuentoTexto] = useState("");
    const [servicioUrgencia, setServicioUrgencia] = useState(false);

    useEffect(() => {
        if (travelerData.diasDeViaje && travelerData.pasajeros && travelerData.fechaIda) {
            let descuento = 0;
            if (travelerData.pasajeros === 2) {
                descuento = 0.1;
                setDescuentoTexto("(-10%)");
            } else if (travelerData.pasajeros >= 3 && travelerData.pasajeros <= 4) {
                descuento = 0.15;
                setDescuentoTexto("(-15%)");
            } else if (travelerData.pasajeros >= 5) {
                descuento = 0.2;
                setDescuentoTexto("(-20%)");
            } else {
                setDescuentoTexto("");
            }

            const precioPorDia = 2800;
            const fechaIda = dayjs(travelerData.fechaIda);
            const hoy = dayjs();
            const diasAntesDeViaje = fechaIda.diff(hoy, 'day');

            let precioTotalSinDescuento = precioPorDia * travelerData.diasDeViaje * travelerData.pasajeros;
            
            if (diasAntesDeViaje >= 0 && diasAntesDeViaje <= 1) {
                precioTotalSinDescuento *= 1.4; // Aumento del 40% para servicios de urgencia
                setServicioUrgencia(true);
            } else {
                setServicioUrgencia(false);
            }

            const precioTotal = precioTotalSinDescuento * (1 - descuento);
            
            setPrecioSinDescuento(precioTotalSinDescuento.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }));
            setPrecio(precioTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }));
            setDescuentoAplicado(descuento > 0);
        }
    }, [travelerData.diasDeViaje, travelerData.pasajeros, travelerData.fechaIda]);

    const seleccionarPlan = () => {
        console.log("Plan Básico seleccionado");
        updateTravelerData({ ...travelerData, plan: 'premium', precio });
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
        </>
    );

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Plan Básico</Typography>
                {detalleBeneficios}
                {descuentoAplicado && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Typography sx={{ textDecoration: 'line-through', color: 'gray' }}>
                            {precioSinDescuento}
                        </Typography>
                        <Typography sx={{ color: 'gray' }}>
                            {descuentoTexto}
                        </Typography>
                    </Box>
                )}
                
                <Typography variant="h6">Precio: {precio}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setVerDetalle(!verDetalle)}>Ver detalle de este plan</Button>
                <Button size="small" onClick={seleccionarPlan}>Seleccionar</Button>
            </CardActions>
        </Card>
    );
};

export default PlanPremium;
