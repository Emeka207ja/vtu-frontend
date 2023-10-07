export interface iUserList{
    id: string,
    url: string,
    name:string
}

export const userListData: iUserList[] = [
    {
        id: "1",
        url: "/allusers",
        name:"All Users"
    },
    {
        id: "2",
        url: "/userstoday",
        name:"Recently joined Users (24hrs)"
    },
]