import { Profile } from "@/Components/Profile/Profile";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";


export default function profile() {
    return (
        <SidebarWithHeader>
            <Profile/>
        </SidebarWithHeader>
    )
}