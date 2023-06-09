import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Airtime } from "@/Components/Airtime";
import {Box} from "@chakra-ui/react"

export default function airtime(){
    return (
        <SidebarWithHeader>
           <Airtime/>
        </SidebarWithHeader>
    )
}