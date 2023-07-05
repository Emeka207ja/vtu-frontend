import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";

// import { Electricity } from "@/Components/Electricity";
import { Electricity } from "@/Components/Electricity/Electricity";

export default function electricity(){
    return (
        <SidebarWithHeader>
           <Electricity/>
        </SidebarWithHeader>
    )
}