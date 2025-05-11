export interface ConversionItem {
  date: string;
  crypto: string;
  amount: number;
  resultUSD: number;
  resultBRL: number;
}

export interface ConversionHistoryTableProps {
  conversionHistory: ConversionItem[];
}
