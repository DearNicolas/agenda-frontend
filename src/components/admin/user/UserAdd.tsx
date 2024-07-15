"use client"

import { useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import * as api from '@/api/admin';

type Props = {
    refreshAction: () => void;
}

export const UserAdd = ({ refreshAction }: Props) => {
    const [nameField, setNameField] = useState('');
    const [numberField, setNumberField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false)

    const userSchema = z.object({
        nameField: z.string().min(1, 'Preecha o nome '),
        numberField: z.string().min(1, 'Preecha o numero '),
    });

    const handleAddButton = async () => {
        setErrors([]);
        const data = userSchema.safeParse({ nameField, numberField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));

        setLoading(true)
        const UserItem = await api.addUser({
            name: data.data.nameField,
            number: data.data.numberField,
        });
        setLoading(false)
        if (UserItem) refreshAction();
    }

    return (
        <div>
            <div className="mb-5">
                <label>Nome</label>
                <InputField
                    value={nameField}
                    onChange={e => setNameField(e.target.value)}
                    placeholder="Digite o nome do usuario"
                    errorMessage={errors.find(item => item.field === 'nameField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Numero</label>
                <InputField
                    value={numberField}
                    onChange={e => setNumberField(e.target.value)}
                    placeholder="Digite o numero do usuario"
                    errorMessage={errors.find(item => item.field === 'numberField')?.message}
                    disabled={loading}
                />
            </div>
            <div>
                <Button
                    value={loading ? 'Adicionando...' : 'Adicionar'}
                    onClick={handleAddButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}