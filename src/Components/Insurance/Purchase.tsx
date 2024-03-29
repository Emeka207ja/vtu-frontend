import { Box } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { TopLabel } from "./TopLabel"
import { insuranceData } from "./iInsurance"
import { iInsure } from "./iInsurance"
import {useState,useEffect} from "react"
import insurance from "@/pages/insurance"
import { CarInsurance } from "./Car/CarInsurance"
import { HomeInsurance } from "./Home/HomeInsurance"
import { PersonalInsurance } from "./Personal/PersonalInsurance"



export const Purchase: React.FC = () => {
    const [selected,setSelected] = useState<iInsure |null>(null)
    const [type] = useQuerryString("type")

    const [car,setCar] = useState<boolean>(false)
    const [home,setHome] = useState<boolean>(false)
    const [personal,setPersonal] = useState<boolean>(false)

    useEffect(() => {
        const val = insuranceData.filter(item => item.type === type)
        setSelected(val[0])

        switch (type) {
            case "car":
                setCar(true)
                setHome(false)
                setPersonal(false)
                break;
            
            case "home":
                setCar(false)
                setHome(true)
                setPersonal(false)
                break;
            
            case "personal":
                setCar(false)
                setHome(false)
                setPersonal(true)
                break;
        
            default:
                break;
        }
    },[type])
 
    return (
        <Box>
           
            
            {
                selected ? (<TopLabel  {...selected} />):""
            }
            {
                car&& <CarInsurance/>
            }

            {
                home && <HomeInsurance/>
            }

            {
                personal && <PersonalInsurance/>
            }
        </Box>
    )
}