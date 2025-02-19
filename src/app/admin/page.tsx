import * as api from '@/api/server';
import { AdminPage } from '@/components/admin/AdminPageA';
import { redirect } from "next/navigation";

const Page = async () => {
    const logged = await api.pingAdmin();
    if (!logged) return redirect('/admin/login');


    return (
        <div>
            <AdminPage />
        </div>

    );
}

export default Page;