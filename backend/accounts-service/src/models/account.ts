import { AccountStatus } from '../models/accountStatus';
export interface IAccount{
    id: number,
    name: string,
    email: string,
    password: string,
    status: AccountStatus,
    domain: string
}