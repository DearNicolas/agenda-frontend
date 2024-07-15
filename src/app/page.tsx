"use client"

import { Button } from "@/components/admin/Button";
import { useRouter } from "next/navigation";

export const Page = () => {
  const router = useRouter();

  const handleLoginHomeButton = async () => {
    router.push('/admin/login');
  }

  return (
    <div className="text-center py-4">
      <p className="text-4xl mb-5 font-serif ">agenda</p>
      <p className="text-xl font-serif mb-3 ">
        Esse é um site para guardar contatos e bloquear contatos
      </p>
      <div className="mx-auto max-w-lg">
        <Button
          value="Entrar"
          onClick={handleLoginHomeButton}
        />
      </div>
    </div>
  )
}

export default Page;