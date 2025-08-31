import { getCartItems } from "@/lib/actions/cart/cart.actions";
import CartTable from "./components/CartTable";
import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";

export const metadata = {
  title: "Shopping Cart",
};

const Cart = async () => {
  const cart = await getCartItems();
  return (
    <AnimatedContainer>
      <CartTable cart={cart} />
    </AnimatedContainer>
  );
};

export default Cart;
