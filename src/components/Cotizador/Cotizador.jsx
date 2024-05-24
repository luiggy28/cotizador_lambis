import React, { useState, useEffect } from 'react';
import { useTraveler } from '../Contexts/TravelerContext';
import { Autocomplete, TextField, Button, Box, FormControl, FormHelperText } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import data from '../mock/data.json';
import celulares from '../mock/celulares.json';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const Cotizador = () => {
    const [origen, setOrigen] = useState(null);
    const [destino, setDestino] = useState(null);
    const [fechaIda, setFechaIda] = useState(null);
    const [fechaRetorno, setFechaRetorno] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pasajeros, setPasajeros] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCountry, setPhoneCountry] = useState(null);
    const [phoneError, setPhoneError] = useState('');
    const [options, setOptions] = useState(data);  
    const [submitClicked, setSubmitClicked] = useState(false);
    const { travelerData, updateTravelerData } = useTraveler();

    useEffect(() => {
        if (origen) {
            setOptions(data.filter(option => option.codigo !== origen.codigo));
        } else {
            setOptions(data);
        }
    }, [origen]);

    const handlePhoneNumberChange = (e) => {
        const newNumber = e.target.value;
        setPhoneNumber(newNumber);
        if (phoneCountry) {
            validatePhoneNumber(newNumber, phoneCountry.valor);
        }
    };

    const validatePhoneNumber = (number, code) => {
        if (!number || !code) {
            setPhoneError('');
            return '';
        }
        try {
            const fullNumber = `${code}${number}`;
            const phoneNumber = parsePhoneNumberFromString(fullNumber);
            if (phoneNumber && phoneNumber.isValid()) {
                setPhoneError('');
                return '';
            } else {
                setPhoneError('Número inválido');
                return 'Número inválido';
            }
        } catch (error) {
            setPhoneError('Error al validar el número');
            return 'Error al validar el número';
        }
    };

    const handlePhoneCountryChange = (event, value) => {
        setPhoneCountry(value);
        if (phoneNumber) {
            validatePhoneNumber(phoneNumber, value?.valor);
        }
    };

    const validateEmail = (email) => {
        const isValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === '') {
            setEmailError('Por favor ingresa tu correo electrónico');
            return 'Por favor ingresa tu correo electrónico';
        } else if (!isValidEmail.test(email)) {
            setEmailError('Ingresa un correo electrónico válido');
            return 'Ingresa un correo electrónico válido';
        }
        setEmailError('');
        return '';
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        validateEmail(value);
    };

    const handleOrigenChange = (event, value) => {
        setOrigen(value);
        setDestino(null);
    };

    const handleDestinoChange = (event, value) => {
        setDestino(value);
    };

    const handleIncrement = () => {
        if (pasajeros < 9) {
            setPasajeros(pasajeros + 1);
            updateTravelerData({ ...travelerData, pasajeros: pasajeros + 1 });
        }
    };

    const handleDecrement = () => {
        if (pasajeros > 1) {
            setPasajeros(pasajeros - 1);
            updateTravelerData({ ...travelerData, pasajeros: pasajeros - 1 });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitClicked(true);

        const formattedFechaIda = fechaIda ? fechaIda.format('YYYY-MM-DD') : null;
        const formattedFechaRetorno = fechaRetorno ? fechaRetorno.format('YYYY-MM-DD') : null;
        const isEmailValid = validateEmail(email) === '';
        const isPhoneNumberValid = phoneNumber && phoneCountry ? validatePhoneNumber(phoneNumber, phoneCountry.valor) === '' : false;
        const isFormValid = origen && destino && formattedFechaIda && formattedFechaRetorno && isEmailValid && pasajeros && isPhoneNumberValid;

        if (isFormValid) {
            const diasDeViaje = fechaRetorno.diff(fechaIda, 'days') + 1;  
            const formData = {
                origen,
                destino,
                fechaIda: formattedFechaIda,
                fechaRetorno: formattedFechaRetorno,
                email,
                pasajeros,
                phoneNumber: `${phoneCountry.valor} ${phoneNumber}`,
                diasDeViaje
            };
            console.log('Form Data:', formData);
            resetForm();
        } else {
            console.log('Some information is incorrect, please check the fields again.');
        }
    };

    const resetForm = () => {
        setOrigen(null);
        setDestino(null);
        setFechaIda(null);
        setFechaRetorno(null);
        setEmail('');
        setPasajeros(1);
        setPhoneNumber('');
        setPhoneCountry(null);
        setPhoneError('');
        setEmailError('');
        setSubmitClicked(false);
    };

    const disabledDateIda = (date) => {
        
        return dayjs(date).isBefore(dayjs(), 'day');
    };

    const disabledDateRetorno = (date) => {
        
        return dayjs(date).isBefore(fechaIda, 'day');
    };

    return (
        <div>
            <h1>Cotiza tu asistencia</h1>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    value={origen}
                    onChange={handleOrigenChange}
                    options={data}
                    getOptionLabel={(option) => option ? `${option.pais}` : ''}
                    isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
                    renderInput={(params) => <TextField {...params} label="Selecciona un país de origen" />}
                />
                <Autocomplete
                    value={destino}
                    onChange={handleDestinoChange}
                    options={options}
                    getOptionLabel={(option) => option ? `${option.pais}` : ''}
                    isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
                    renderInput={(params) => <TextField {...params} label="Selecciona un país de destino" />}
                    disabled={!origen}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha de Ida"
                        value={fechaIda}
                        onChange={setFechaIda}
                        shouldDisableDate={disabledDateIda}
                    />
                    <DatePicker
                        label="Fecha de Retorno"
                        value={fechaRetorno}
                        onChange={setFechaRetorno}
                        shouldDisableDate={disabledDateRetorno}
                        disabled={!fechaIda}
                    />
                </LocalizationProvider>
                <FormControl fullWidth error={!!emailError}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        variant="outlined"
                    />
                    {emailError && <FormHelperText>{emailError}</FormHelperText>}
                </FormControl>
                <Autocomplete
                    value={phoneCountry}
                    onChange={handlePhoneCountryChange}
                    options={celulares}
                    getOptionLabel={(option) => `${option.nombre} (${option.valor})`}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Código de País" />}
                />
                <TextField
                    label="Número de Celular"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    error={!!phoneError}
                    helperText={phoneError}
                    fullWidth
                />
                <Box display="flex" alignItems="center" gap={2}>
                    <Button variant="outlined" onClick={handleDecrement}>-</Button>
                    <span>{pasajeros}</span>
                    <Button variant="outlined" onClick={handleIncrement}>+</Button>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit}
                    disabled={submitClicked && (!origen || !destino || !fechaIda || !fechaRetorno || !email || !phoneNumber || !phoneCountry)}
                >
                    Cotizar
                </Button>
            </form>
        </div>
    );
};

export default Cotizador;
