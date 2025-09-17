import { getCartItems } from "@/lib/actions/cart/cart.actions";
import CartTable from "./components/CartTable";
import Container from "@/components/widgets/container/Container";

export const metadata = {
  title: "Shopping Cart",
};

const Cart = async () => {
  const cart = await getCartItems();
  return (
    <Container>
      <CartTable cart={cart} />
    </Container>
  );
};

export default Cart;
