import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { UpdateData } from "@/Components/Admin/Data/UpdateData";


export default function data() {
    return (
        <SidebarWithHeader>
            <UpdateData/>
        </SidebarWithHeader>
    )
}