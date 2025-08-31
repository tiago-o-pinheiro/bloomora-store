import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";

type CheckoutStep = {
  label: string;
  value: number;
};

type CheckoutStepsProp = {
  activeStep: number;
  checkoutSteps: CheckoutStep[];
};

const Step = ({
  step,
  activeStep,
}: {
  step: CheckoutStep;
  activeStep: number;
}) => {
  const stepTextStyle =
    activeStep === step.value
      ? "text-primary font-bold"
      : "text-muted-foreground";
  return (
    <div className="flex flex-row items-center gap-2">
      {step.value < activeStep && (
        <CheckCircleIcon className="w-4 h-4 text-primary" />
      )}
      <span
        className={cn("text-sm font-medium hidden md:block", stepTextStyle)}
      >
        {step.label}
      </span>
      <span className={cn("text-sm font-medium md:hidden", stepTextStyle)}>
        {step.value}
      </span>
    </div>
  );
};

const CheckoutSteps = ({ checkoutSteps, activeStep }: CheckoutStepsProp) => {
  return (
    <div className="flex justify-center  mb-10">
      {checkoutSteps.map((step) => (
        <div className="flex items-center justify-between" key={step.value}>
          <div
            className={cn(
              "flex items-center justify-center py-2 px-4 w-10 h-10 md:w-auto rounded-full text-center text-sm ",
              activeStep === step.value ? "bg-secondary" : ""
            )}
          >
            <Step step={step} activeStep={activeStep} />
          </div>
          {step !== checkoutSteps[checkoutSteps.length - 1] && (
            <hr className="sm: w-4 md:w-16 border-t border-gray-300 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
