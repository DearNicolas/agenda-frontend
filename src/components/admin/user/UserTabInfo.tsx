import { User } from "@/types/User"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '@/api/admin';

type Props = {
    User: User;
    refreshAction: () => void;
}
export const UserTabInfo = ({ User, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(User.name);
    const [numberField, setNumberField] = useState(User.number);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const userSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        numberField: z.string().min(1, 'Preencha o numero'),
    });

    useEffect(() => {
        setErrors([]);
        const data = userSchema.safeParse({ nameField, numberField })
        if (!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField, numberField]);

    const handleSaveButton = async () => {
        if (errors.length > 0) return;

        setLoading(true);
        const updatedUser = await api.updateUser(
            User.id,
            {
                name: nameField,
                number: numberField,
            }
        );
        if (updatedUser) {
            refreshAction();
        } else {
            alert('Não foi possivel obter essa informaçao');
        }

    }

    return (
        <div className="my-3">
            <div className="mb-5">
                <label>Nome</label>
                <InputField
                    value={nameField}
                    onChange={e => setNameField(e.target.value)}
                    placeholder="Digite o nome do usuario"
                    errorMessage={errors.find(item => item.field === 'nameField')?.message}
                />
            </div>
            <div className="mb-5">
                <label>Numero</label>
                <InputField
                    value={numberField}
                    onChange={e => setNumberField(e.target.value)}
                    placeholder="Digite o numero do usuario"
                    errorMessage={errors.find(item => item.field === 'numberField')?.message}
                />
            </div>
            <div>
                <Button
                    value={loading ? 'Salvando....' : 'Salvar'}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>
        </div>
    )
}