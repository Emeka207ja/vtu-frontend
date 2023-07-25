import { Box } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useState, useEffect } from "react"
import { WaecRegister } from "./WaecRegister"
import { WaecResult } from "./WaecResult"
import { LabelData } from "./Label"


export const PurchaseWaec: React.FC = () => {
    const [type] = useQuerryString("type")
    const [data, setData] = useState<{ private: boolean, general: boolean }>({ private: false, general: false })
    
    useEffect(() => {
        switch (type) {
            case "private":
                setData({private:true,general:false})
                break;
            
            case "general":
                setData({private:false,general:true})
                break;
        
            default:
                break;
        }
    },[type])

    return (
        <Box>
            <LabelData type={type} />
            {
                data.private?(<WaecRegister/>):data.general? (<WaecResult/>): ""
          }
        </Box>
    )
}