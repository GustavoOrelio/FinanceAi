import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-2 h-full">
      {/* ESQUERDA */}
      <div className="mx-auto flex flex-col h-full max-w-[550px] justify-center p-8">
        <Image src="/logo.svg" alt="Finance AI" width={100} height={100} className="mb-8" />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar
          suas movimentações, e oferecer insights personalizados, facilitando o controle de seu orçamento.
        </p>
        <SignInButton mode="modal">
          <Button variant="outline" className="mt-4">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image src="/login.png" alt="Faça login" fill className="object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
