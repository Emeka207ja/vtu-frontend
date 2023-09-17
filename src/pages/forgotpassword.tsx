import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { ForgotPassword } from "@/Components/Auth/ForgotPassword";
export default function forgotpassword() {
    return (
        <SidebarWithHeader>
            <ForgotPassword/>
        </SidebarWithHeader>
    )
}