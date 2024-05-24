import React, { createContext, useState, useContext } from 'react';


export const TravelerContext = createContext();


export const useTraveler = () => useContext(TravelerContext);


export const TravelerProvider = ({ children }) => {
    const [travelerData, setTravelerData] = useState({
        pasajeros: 1,
        origen: '',
        destino: '',
        fechaIda: null,
        fechaRetorno: null,
        email: '',
        phoneNumber: '',
        phoneCountry: '',
        diasDeViaje: 0, 
        travelersInfo: Array(1).fill({ nombre: '', apellido: '', documento: '', nacimiento: null }),
    });

    const updateTravelerData = (data) => {
        setTravelerData((prev) => ({ ...prev, ...data }));
    };

    const resetTravelersInfo = (newSize) => {
        setTravelerData((prev) => ({
            ...prev,
            travelersInfo: Array(newSize).fill({ nombre: '', apellido: '', documento: '', nacimiento: null }),
        }));
    };

    
    return (
        <TravelerContext.Provider value={{ travelerData, updateTravelerData, resetTravelersInfo }}>
            {children}
        </TravelerContext.Provider>
    );
};
