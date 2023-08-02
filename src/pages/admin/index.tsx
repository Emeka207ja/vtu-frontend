import { Admin } from "@/Components/Admin/Admin";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";

export default function admin() {
    return (
        <SidebarWithHeader>
            <Admin/>
        </SidebarWithHeader>
    )
}