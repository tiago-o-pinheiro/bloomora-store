import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import CheckoutHeading from "@/components/widgets/checkout-heading/CheckoutHeading";

const PaymentMethodsPage = () => {
  return (
    <AnimatedContainer className="max-w-2xl mx-auto px-4">
      <CheckoutHeading
        title="Payment Methods"
        description="Please select your preferred payment method."
      />
    </AnimatedContainer>
  );
};

export default PaymentMethodsPage;
