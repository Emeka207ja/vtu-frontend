
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
    phone:string|null
    gender: string | null;
    verifiled: boolean;
    image:null|string
    auth: Auth
    
}

interface Auth{
    id: number;
    created_at: string;
    updated_at: string;
    username: string;
    email:string
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
    phone:null,
    gender: null,
    verifiled:false,
    image:"",
    auth: {
        id: 0,
        created_at: "",
        updated_at: "",
        username: "",
        email:"",
        role:[]
    }
    
}