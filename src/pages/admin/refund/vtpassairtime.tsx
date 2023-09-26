import { VtFailedAirtime } from "@/Components/Admin/Refunds/Data/VtfailedAirtime";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";

export default function vtpassairtime() {
    return (
        <SidebarWithHeader>
            <VtFailedAirtime/>
        </SidebarWithHeader>
    )
}