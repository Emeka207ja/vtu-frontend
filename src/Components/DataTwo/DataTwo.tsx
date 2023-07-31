import { Box, Text, Flex, Image,Center } from "@chakra-ui/react" 
import { providerData } from "./idataTwo"
import { iProvider } from "../Data/iProfvider"
import { useState, useEffect } from "react"
import { MtnSME} from "./Mtn"
import { formdata, iformdata } from "./idataTwo"
import { MtnCG } from "./MtnCG"
import { AirtelCG } from "./AirtelCG"
import { GloCG } from "./GloCG"
import { GloGift } from "./GloGift"


export const DataTwo: React.FC = () => {
    const [selected, setSelected] = useState<string>("")
    const [formData, setForm] = useState<iformdata>(formdata)
    
    useEffect(() => {
        switch (selected) {
            case "Airtel CG":
                setForm({Airtel_CG:true,MTN_CG:false,MTN_SME:false,Glo_CG:false,Glo_Gifting:false})
                break;
        
            case "MTN CG":
                setForm({Airtel_CG:false,MTN_CG:true,MTN_SME:false,Glo_CG:false,Glo_Gifting:false})
                break;
        
            case "MTN SME":
                setForm({Airtel_CG:false,MTN_CG:false,MTN_SME:true,Glo_CG:false,Glo_Gifting:false})
                break;
        
            case "Glo Gifting":
                setForm({Airtel_CG:false,MTN_CG:false,MTN_SME:false,Glo_CG:false,Glo_Gifting:true})
                break;
        
            case "Glo CG":
                setForm({Airtel_CG:false,MTN_CG:false,MTN_SME:false,Glo_CG:true,Glo_Gifting:false})
                break;
        
            default:
                break;
        }
    },[selected])
    return (
        <Box>
            <Flex alignItems={"center"} justifyContent={"space-between"} flexWrap={"wrap"}>
                {
                    providerData.map(item => {
                        return (
                            <Box key={item.name} w={"6rem"}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    borderRadius={"xl"}
                                    onClick={() => setSelected(item.name)}
                                    border={selected === item.name ? "3px solid green" : ""}
                                    w={{base:"3rem",md:"100%"}}
                                />
                                <Text  fontSize={"0.8rem"} textAlign={{md:"center"}}>{ item.name}</Text>
                            </Box>
                        )
                    })
                }
            </Flex>
            {
                formData.MTN_SME && (<MtnSME/>)
            }

            {
                formData.MTN_CG&& (<MtnCG/>)
            }

            {
                formData.Airtel_CG && <AirtelCG/>
            }
            {
                formData.Glo_CG && <GloCG/>
            }

            {
                formData.Glo_Gifting && <GloGift/>
            }
        </Box>
    )
}