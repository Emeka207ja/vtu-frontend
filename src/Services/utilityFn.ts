import { iAuth } from "@/Components/Wassce/service";



export function retrieveNumberFromString(inputString: string): number  {
    const numberStr = inputString?.substring(1);
    console.log
    return parseFloat(numberStr);
}

export const vtpassHeaderfn = (auth: iAuth) => {
    const { api_key, secret_key } = auth;
    if (!api_key || !secret_key) {
        throw new Error("auth keys not found")
    }
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
    return config
}