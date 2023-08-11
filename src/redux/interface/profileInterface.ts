
export interface iProfile{
    id: number;
    created_at: string;
    updated_at: string;
    balance: number;
    point: number;
    email: string|null;
    firstname: string | null;
    lastname:string|null
    username:string|null
    name:string|null
    phone:string|null
    gender: string | null;
    isMonified: boolean;
    pin: number;
    verifiled: boolean;
    defaultPinChanged: boolean;
    ReferralCount: number;
    TotalReferred: number;
    image:null|string
    auth: Auth
    
}

interface Auth{
    id: number;
    created_at: string;
    updated_at: string;
    username: string;
    email: string
    name:null|string
    role:Role[]
}

enum Role {
    "user",
    "admin"
}


export const InitialProfile:iProfile ={
    id: 0,
    created_at: "",
    updated_at: "",
    balance: 0,
    point: 0,
    email: "",
    firstname: null,
    lastname:null,
    username:null,
    name:null,
    phone:null,
    gender: null,
    verifiled: false,
    pin: 1111,
    defaultPinChanged: false,
    image: "",
    ReferralCount: 0,
    TotalReferred: 0,
    isMonified:false,
    auth: {
        id: 0,
        created_at: "",
        updated_at: "",
        username: "",
        name:null,
        email:"",
        role:[]
    }
    
}