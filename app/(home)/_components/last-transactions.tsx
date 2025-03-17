import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Link from "next/link";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "@/app/_utils/currency";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lastTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
                  <Image
                    src={
                      TRANSACTION_PAYMENT_METHOD_ICONS[
                        transaction.paymentMethod
                      ]
                    }
                    alt={transaction.paymentMethod}
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {formatCurrency(Number(transaction.amount))}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
