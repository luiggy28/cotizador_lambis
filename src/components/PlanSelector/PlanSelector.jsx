import { Box } from "@mui/material";
import PlanBasico from "./PlanBasico";
import PlanPremium from "./PlanPremium";

const PlanSelector = () => {

    return (
        <div>
            <Box >

            < PlanBasico />

            < PlanPremium />
            
            </Box>

        </div>
    );
};

export default PlanSelector;