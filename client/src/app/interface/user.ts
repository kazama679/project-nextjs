export interface User {
    id: number;
    name: string;
    email: string;
    status: boolean;
    password: string;
    role: boolean;
    avatar: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
    cart: Array<any>;
    like: Array<any>;
};