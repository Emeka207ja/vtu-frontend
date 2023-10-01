import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { ForgotPassword } from "@/Components/Auth/ForgotPassword";
import NotAuthHeader from "@/Components/Dashboard/NotAuthDassboard"
export default function forgotpassword() {
    return (
        <NotAuthHeader>
            <ForgotPassword/>
        </NotAuthHeader>
    )
}