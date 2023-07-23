import { Box, Grid, FormControl, FormLabel, Input,Select } from "@chakra-ui/react"
import { Label } from "./Label"
import { getCountries } from "./service"
import { iCountry } from "./iLabel"
import {useState,useEffect} from "react"


export const IntAirtime: React.FC = () => {

    const [countries, setCountries] = useState<iCountry[] | []>([])
    const [img,setImg] = useState<string>("")
    const [selected, setSelected] = useState<string>("")
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setSelected(target.value)
    }
    
    const handleCountries = async () => {
        try {
            const data = await getCountries()
            if(data){
                const country: iCountry[] = data.content?.countries
                setCountries(country)
            }
            console.log(data)
        } catch (error:any) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCountries()
    }, [])

    useEffect(() => {
        if (countries.length > 0) {
            const country: iCountry[] = countries.filter(item => item.code === selected)
            if (country) {
                const flag:string = country[0].flag
                setImg(flag)
               
            }
        }
    }, [selected])
    
    
    return (
        <Box>
            <Label image={img} />
            <Box>
                <form>
                    <Grid>
                        <FormControl>
                            <FormLabel>country</FormLabel>
                            <Select value={selected} onChange={handleInput}>
                                {
                                    countries.length > 0 && countries.map(item => (<option value={item.code} key={item.code}>{item.name }</option>))
                               }
                            </Select>
                        </FormControl>
                    </Grid>
                </form>
           </Box>
        </Box>
    )
}