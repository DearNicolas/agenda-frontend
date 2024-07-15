import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: 'Agenda - Admin'
}

type Props = { children: ReactNode }
const Layout = ({ children }: Props) => {
    return (
        <div>
            <header className="bg-gradient-to-r from-black via-gray-300 to-black text-center py-5 brightness-90 shadow-2xl rounded text-black">
                <h3 className="text-3xl font-serif">Agenda</h3>
                <h4 className="text-md font-serif">Painel de Controle</h4>
            </header>
            <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
        </div>
    )
}

export default Layout;