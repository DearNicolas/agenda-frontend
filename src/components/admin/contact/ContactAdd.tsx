import { useState } from "react";
import { InputField } from "../InputField";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { Button } from "../Button";
import * as api from '@/api/admin';

type Props = {
    id_user: number;
    refreshAction: () => void;
}
export const ContactAdd = ({ id_user, refreshAction }: Props) => {
    const [nameField, setNameField] = useState('');
    const [numberField, setNumberField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const contactSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        numberField: z.string().min(1, 'Preencha o numero')
    });

    const handleAddButton = async () => {
        setErrors([]);
        const data = contactSchema.safeParse({ nameField, numberField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));

        setLoading(true);
        const newContact = await api.addContact(id_user, {
            name: nameField,
            number: numberField,
        });
        setLoading(false);
        if (newContact) {
            setNameField('');
            setNumberField('');
            refreshAction();
        } else {
            alert('Ocorreu um erro');
        }
    }

    return (
        <div>
            <h4 className="text-xl">Novo Contato</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome do Contato"
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />
            <InputField
                value={numberField}
                onChange={e => setNumberField(e.target.value)}
                placeholder="Digite o numero do Contato"
                errorMessage={errors.find(item => item.field === 'numberField')?.message}
                disabled={loading}
            />
            <div className="flex mb-5">
                <div className="">
                    <Button
                        value={loading ? 'Adicionando...' : 'Adicionar'}
                        onClick={handleAddButton}
                    />
                </div>
            </div>
        </div>
    )
}