import { cn } from "@/lib/utils";

const Price = ({ value, className }: { value: string; className?: string }) => {
  const [intValue, floatValue] = value.split(".");
  return (
    <p className={cn("text-2xl font-semibold", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};

export default Price;
