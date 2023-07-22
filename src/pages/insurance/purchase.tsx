import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Purchase } from "@/Components/Insurance/Purchase";


export default function purchase() {
    return (
        <SidebarWithHeader>
            <Purchase/>
        </SidebarWithHeader>
    )
}