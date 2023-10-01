import { ResetPassword } from "@/Components/Auth/ResetPassword";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import NotAuthHeader from "@/Components/Dashboard/NotAuthDassboard"

export default function resetpassword() {
    return (
        <NotAuthHeader>
            <ResetPassword/>
        </NotAuthHeader>
    )
}