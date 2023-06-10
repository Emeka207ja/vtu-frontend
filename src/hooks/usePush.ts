import { NextRouter, useRouter } from "next/router"



export function usePush(route: string) {
     const router: NextRouter = useRouter()
    return router.push(route)
}
    
