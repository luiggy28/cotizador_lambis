import React, { createContext, useContext, useState } from 'react';


const TravelPlanContext = createContext(null);


export const useTravelPlan = () => useContext(TravelPlanContext);


export const TravelPlanProvider = ({ children }) => {
    const [diasDeViaje, setDiasDeViaje] = useState(0);

    const value = {
        diasDeViaje,
        setDiasDeViaje
    };

    return (
        <TravelPlanContext.Provider value={value}>
            {children}
        </TravelPlanContext.Provider>
    );
};


export { TravelPlanContext };
