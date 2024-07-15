import { User } from '@/types/User';
import { Contact } from '@/types/Contact'
import { getCookie } from 'cookies-next';
import { req } from './axios';

export const login = async (password: string) => {
    try {
        const json = await req.post('http://localhost:3001/admin/login', { password });
        return json.data.token as string ?? false;
    } catch (err) { return false }
}

// USERS

export const getUser = async () => {
    const token = getCookie('token');
    const json = await req.get('http://localhost:3001/admin/users', {
        headers: { 'Authorization': `Token ${token}` }
    });
    return json.data.users as User[] ?? [];
}

type AddUserData = {
    name: string;
    number: string;
}
export const addUser = async (data: AddUserData): Promise<User | false> => {
    const token = getCookie('token');
    const json = await req.post(`http://localhost:3001/admin/users`, data,
        { headers: { 'Authorization': `Token ${token}` } });
    return json.data.users as User ?? false;
}

type UpdateUserData = {
    name?: string;
    number?: string;
}
export const updateUser = async (id: number, data: UpdateUserData): Promise<User | false> => {
    const token = getCookie('token');
    const json = await req.put(`http://localhost:3001/admin/users/${id}`, data,
        { headers: { 'Authorization': `Token ${token}` } });
    return json.data.users as User ?? false;
}

export const deleteUser = async (id: number) => {
    const token = getCookie('token');
    const json = await req.delete(`http://localhost:3001/admin/users/${id}`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    return !json.data.error;
}

// CONTACTS

export const getContact = async (id_user: number) => {
    const token = getCookie('token');
    const json = await req.get(`http://localhost:3001/admin/users/${id_user}/contacts`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    console.log(json.data)
    return json.data.contact as Contact[] ?? [];
}

type AddContactData = {
    name: string;
    number: string;
}
export const addContact = async (id_user: number, data: AddContactData): Promise<Contact | false> => {
    const token = getCookie('token');
    const json = await req.post(`http://localhost:3001/admin/users/${id_user}/contacts`, data, {
        headers: { 'Authorization': `Token ${token}` }
    });
    return json.data.contact as Contact ?? false;
}

type UpdateContactData = {
    name: string;
    number: string;
}
export const updateContact = async (id_user: number, id: number, data: UpdateContactData): Promise<Contact | false> => {
    const token = getCookie('token');
    const json = await req.put(`http://localhost:3001/admin/users/${id_user}/contacts/${id}`, data, {
        headers: { 'Authorization': `Token ${token}` }
    });
    return json.data.contact as Contact ?? false;
}

export const deleteContact = async (id_user: number, id: number) => {
    const token = getCookie('token');
    const json = await req.delete(`http://localhost:3001/admin/users/${id_user}/contacts/${id}`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    return !json.data.error;
}