"use client"

import { User } from "@/types/User"
import { useState } from "react";
import { UserTabInfo } from "./UserTabInfo";
import { UserTabContacts } from "../contact/UserTabContact"


type TabNames = 'info' | 'contact';
type Props = {
    user: User | undefined;
    refreshAction: () => void;
}
export const UserEdit = ({ user, refreshAction }: Props) => {
    if (!user) return;
    const [tab, setTab] = useState<TabNames>('info');

    return (
        <div>
            <div className="flex text-center border-b border-white cursor-pointer">
                <div onClick={() => setTab('info')} className={`flex-1 p-3 hover:bg-zinc-700  ${tab === 'info' ? 'bg-zinc-800' : ''}`}>Informações</div>
                <div onClick={() => setTab('contact')} className={`flex-1 p-3 hover:bg-zinc-700  ${tab === 'contact' ? 'bg-zinc-800' : ''}`}>Contatos</div>
            </div>
            <div>
                {tab === 'info' && <UserTabInfo User={user} refreshAction={refreshAction} />}
                {tab === 'contact' && <UserTabContacts id_user={user.id} />}
            </div>
        </div>
    )
}