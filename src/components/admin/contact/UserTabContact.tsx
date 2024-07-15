import { Contact } from "@/types/Contact";
import { useEffect, useState } from "react";
import * as api from '@/api/admin';
import { ContactItem, ContactItemPlaceholder, ContactItemNotFound } from "./ContactItem";
import { ContactAdd } from "./ContactAdd";
import { ContactEdit } from "./ContactEdit";

type Props = {
    id_user: number;
}
export const UserTabContacts = ({ id_user }: Props) => {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setloading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    const loadContacts = async () => {
        setSelectedContact(null);
        setloading(true);
        const contactList = await api.getContact(id_user);
        setloading(false);
        setContacts(contactList);
    }

    const handleEditButton = (contact: Contact) => {
        setSelectedContact(contact)
    }

    useEffect(() => {
        loadContacts();
    }, [])

    return (
        <div>
            <div className=" border border-dashed p-3 my-3">
                {!selectedContact && <ContactAdd id_user={id_user} refreshAction={loadContacts} />}
                {selectedContact && <ContactEdit contact={selectedContact} refreshAction={loadContacts} />}
            </div>

            {!loading && contacts.length > 0 && contacts.map(item => (
                <ContactItem
                    key={item.id}
                    item={item}
                    refreshAction={loadContacts}
                    onEdit={handleEditButton}
                />
            ))}
            {loading &&
                <>
                    <ContactItemPlaceholder />
                    <ContactItemPlaceholder />
                </>
            }
            {!loading && contacts.length === 0 && <ContactItemNotFound />}
        </div>
    )
}