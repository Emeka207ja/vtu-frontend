import { User } from "@/Components/Admin/Users/Users";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";

export default function users() {
    return (
        <SidebarWithHeader>
            <User/>
        </SidebarWithHeader>
    )
}