import Container from "@/components/widgets/container/Container";
import CheckoutHeading from "@/components/widgets/checkout-heading/CheckoutHeading";

import { getUserById, getSessionUser } from "@/lib/actions/user/user.actions";
import PaymentMethodForm from "./components/PaymentForm";

const getCurrentUser = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return null;
  }
  const user = await getUserById(sessionUser.id);
  return user.data;
};

const PaymentMethodsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <Container className="max-w-2xl mx-auto px-4">
      <CheckoutHeading
        title="Payment Methods"
        description="Please select your preferred payment method."
      />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </Container>
  );
};

export default PaymentMethodsPage;
