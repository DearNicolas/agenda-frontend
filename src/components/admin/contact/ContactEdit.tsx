import { Contact } from "@/types/Contact";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '@/api/admin';

type Props = {
    contact: Contact;
    refreshAction: () => void;
}
export const ContactEdit = ({ contact, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(contact.name);
    const [numberField, setNumberField] = useState(contact.number);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const contactSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        numberField: z.string().min(1, 'Preencha o numero'),
    });

    useEffect(() => {
        setErrors([]);
        const data = contactSchema.safeParse({ nameField, numberField });
        if (!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField, numberField]);

    const handleSaveButton = async () => {
        try {
            if (errors.length > 0) return;
            setLoading(true);
            const updatedContact = await api.updateContact(contact.id_user, contact.id, {
                name: nameField,
                number: numberField
            });
            setLoading(false);
            console.log(contact)
            if (updatedContact) {
                refreshAction();
            } else {
                alert(contact.id);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h4 className="text-xl">Editar Contato</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome do contato"
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />
            <InputField
                value={numberField}
                onChange={e => setNumberField(e.target.value)}
                placeholder="Digite o numero do contato"
                errorMessage={errors.find(item => item.field === 'numberField')?.message}
                disabled={loading}
            />
            <div className="flex gap-3">
                <Button value="Cancelar" disabled={loading} onClick={() => refreshAction()} />
                <Button value={loading ? 'Salvando...' : 'Salvar'} disabled={loading} onClick={handleSaveButton} />
            </div>
        </div>
    );
};