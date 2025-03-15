import { TransactionType } from "@prisma/client";

export type TransactionTypePercentagePerType = {
  [key in TransactionType]: number;
};
