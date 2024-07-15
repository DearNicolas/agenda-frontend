"use client"

import { User } from '@/types/User';
import * as api from '@/api/admin';
import { useEffect, useState } from 'react';
import { UserItem, UserItemNotFound, UserItemPlaceholder } from './user/UserItem';
import { ItemButton } from './ItemButton';
import { FaPlus } from 'react-icons/fa';
import { ModalScreens } from '@/types/ModalScreens';
import { Modal } from './Modal';
import { UserAdd } from './user/UserAdd';
import { UserEdit } from './user/UserEdit';

// const LoaddedPage = ({ loading, users, loadUsers, editUser }: any) => {
//     console.log(users.length);
//     if (loading) {
//         return (
//             <UserItemPlaceholder />
//         )
//     } else {
//         if (users.length === 0) {

//             return (
//                 <div>{!loading && users.length > 0 && users.map((item: User) => (
//                     <UserItem
//                         key={item.id}
//                         item={item}
//                         refreshAction={loadUsers}
//                         openModal={(user: User) => editUser(user)}
//                     />
//                 ))}</div>
//             )

//         } else {
//             return (<UserItemNotFound />)
//         }
//     }
// }

export const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
    const [selectedUser, setSelectedUser] = useState<User>();

    const loadUsers = async () => {
        setModalScreen(null);
        setLoading(true);
        const userList = await api.getUser();
        setLoading(false);
        setUsers(userList);
        // console.log(userList);
    }

    const editUser = (user: User) => {
        setSelectedUser(user);
        setModalScreen('edit');
    }

    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <div>
            <div className="p-3 flex items-center">
                <h1 className="text-2xl flex-1">Usuários</h1>
                <ItemButton
                    IconElement={FaPlus}
                    onClick={() => setModalScreen('add')}
                />
            </div>
            <div className="my-4 text-xl ">
                {!loading && users.length > 0 && users.map(item => (
                    <UserItem
                        key={item.id}
                        item={item}
                        refreshAction={loadUsers}
                        openModal={user => editUser(user)}
                    />
                ))}
                {!loading && users.length === 0 && <UserItemNotFound />}
                {loading &&
                    <>
                        <UserItemPlaceholder />
                        <UserItemPlaceholder />
                    </>
                }
                {/* <LoaddedPage loading={loading} users={users} loadUsers={loadUsers} editUser={editUser} /> */}
            </div>
            {modalScreen &&
                <Modal onClose={() => setModalScreen(null)}>
                    {modalScreen === 'add' && <UserAdd refreshAction={loadUsers} />}
                    {modalScreen === 'edit' && <UserEdit user={selectedUser} refreshAction={loadUsers} />}
                </Modal>
            }
        </div>
    );
}