import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
// import { VtFailedData } from "@/Components/Admin/Refunds/Data/vtfailedData";
import { VtFailedData } from "@/Components/Admin/Refunds/Data/VtfailedData";

export default function vtpassdata() {
    return (
        <SidebarWithHeader>
            <VtFailedData/>
        </SidebarWithHeader>
    )
}