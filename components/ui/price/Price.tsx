import { cn, formatCurrency } from "@/lib/utils";

const Price = ({ value, className }: { value: string; className?: string }) => {
  return (
    <p className={cn("text-xl font-semibold", className)}>
      {formatCurrency(value)}
    </p>
  );
};

export default Price;
