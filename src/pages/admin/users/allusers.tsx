import { AllUserList } from "@/Components/Admin/Users/AllUsersList";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";

export default function allusers() {
    return (
        <SidebarWithHeader>
            <AllUserList/>
        </SidebarWithHeader>
    )
}