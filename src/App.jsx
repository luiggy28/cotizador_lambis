import React from 'react';
import { TravelerProvider } from './components/Contexts/TravelerContext';
import Cotizador from './components/Cotizador/Cotizador';
import Formulario from './components/Formulario/Formulario';
import PlanSelector from './components/PlanSelector/PlanSelector';
import { TravelPlanProvider } from './components/Contexts/TravelPlanContext';


function App() {
    return (
        <TravelerProvider>
            <TravelPlanProvider>
                <div>
                    <h1>Información de Cotización</h1>
                    <Cotizador />
                </div>
                <hr />
                <div>
                    <h1>Elige tu asistencia</h1>
                    <PlanSelector />
                </div>
                <hr />
                <div>
                    <h1>Información de los Viajeros</h1>
                    <Formulario />
                </div>
            </TravelPlanProvider>


        </TravelerProvider>
    );
}

export default App;
