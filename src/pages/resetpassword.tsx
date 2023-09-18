import { ResetPassword } from "@/Components/Auth/ResetPassword";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";


export default function resetpassword() {
    return (
        <SidebarWithHeader>
            <ResetPassword/>
        </SidebarWithHeader>
    )
}