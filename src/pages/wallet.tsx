import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Wallet } from "@/Components/Wallet";
import {Box} from "@chakra-ui/react"

export default function wallet(){
    return (
        <SidebarWithHeader>
           <Wallet/>
        </SidebarWithHeader>
    )
}