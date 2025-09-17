import { auth } from "@/auth";
import { getCartItems } from "@/lib/actions/cart/cart.actions";
import { redirect } from "next/navigation";
import ShippingForm from "./components/ShippingForm";
import type { ShippingAddress } from "@/lib/types/shipping-address.type";
import { getShippingAddressByUserId } from "@/lib/actions/shipping-address/shipping-address.action";
import CheckoutHeading from "@/components/widgets/checkout-heading/CheckoutHeading";
import Container from "@/components/widgets/container/Container";

export const metadata = {
  title: "Shopping Cart",
};

const ShippingAddress = async () => {
  const cart = await getCartItems();
  const session = await auth();

  if (!cart || cart.items.length === 0 || !session?.user) {
    return redirect("/cart");
  }

  const address = await getShippingAddressByUserId(session.user.id);

  return (
    <Container className="max-w-2xl mx-auto px-4">
      <CheckoutHeading
        title="Shipping Address"
        description="Please enter your shipping address details below."
      />
      <ShippingForm
        address={address.data as ShippingAddress}
        userId={session.user.id}
      />
    </Container>
  );
};

export default ShippingAddress;
