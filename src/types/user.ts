export interface IUser {
    id?: string;
    name: string;
    phone: number;
    email?: string;
    password?: string;
    isActive?: boolean;
    created_at?: string;
    updated_at?: string;
}
   