// import { UpdatePin } from "@/Components/Pin/UpdatePin";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { ManagePin } from "@/Components/Pin/ManagePin";

export default function update_pin() {
    return (
        <SidebarWithHeader>
            <ManagePin/>
        </SidebarWithHeader>
    )
}