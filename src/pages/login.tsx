import { Login } from "@/Components/Auth/Login";
import NotAuthHeader from "@/Components/Dashboard/NotAuthDassboard";
export default function login() {
    return (
       <NotAuthHeader>
             <Login/>
      </NotAuthHeader>
    )
}