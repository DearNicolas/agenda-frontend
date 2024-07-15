import { Contact } from "@/types/Contact"
import { ItemButton } from "../ItemButton";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as api from '@/api/admin';

type Props = {
    item: Contact;
    refreshAction: () => void;
    onEdit: (contact: Contact) => void;
}
export const ContactItem = ({ item, refreshAction, onEdit }: Props) => {

    const handleDeleteButton = async () => {
        if (confirm('tem certeza que deseja excluir este contato?')) {
            await api.deleteContact(item.id_user, item.id);
            refreshAction();
        }
    }

    return (
        <div className="border border-white bg-black rounded p-3 mb-3 flex items-center">
            <div className="flex-1">{item.name}</div>
            <div className="flex-1">{item.number}</div>
            <ItemButton
                IconElement={FaRegEdit}
                onClick={() => onEdit(item)}
            />
            <ItemButton
                IconElement={FaRegTrashAlt}
                onClick={handleDeleteButton}
            />
        </div>
    );
}

export const ContactItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 
            bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    )
}

export const ContactItemNotFound = () => {
    return (
        <div className="text-center py-4 text-gray-500">Não há Contatos para esse usuario</div>
    )
}