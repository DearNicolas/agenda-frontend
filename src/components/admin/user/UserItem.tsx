import { User } from "@/types/User";
import { ItemButton } from "../ItemButton";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as api from '@/api/admin';

type Props = {
    item: User;
    refreshAction: () => void;
    openModal: (user: User) => void;
}
export const UserItem = ({ item, refreshAction, openModal }: Props) => {


    const handleDeleteButton = async () => {
        if (confirm('Tem certeza que deseja excluir este usuario?')) {
            await api.deleteUser(item.id);
            refreshAction();
        }
    }

    const handleEditButton = () => openModal(item);
    return (
        <div className="border border-white rounded p-3 mb-3 flex flex-col items-center md:flex-row">
            <div className="flex-1 text-xl md:text-base">{item.name}</div>
            <div className="flex-1 text-xl md:text-base">{item.number}</div>
            <div className="flex items-center gap-1 mt-2 md:mt-0">
                <ItemButton
                    IconElement={FaRegEdit}
                    label="Editar"
                    onClick={handleEditButton}
                />
                <ItemButton
                    IconElement={FaRegTrashAlt}
                    label="Excluir"
                    onClick={handleDeleteButton}
                />
            </div>
        </div>
    );
}

export const UserItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 
            bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    )
}

export const UserItemNotFound = () => {
    return (
        <div className="text-center py-4 text-gray-500">Não há Usuarios cadastrados</div>
    )
}