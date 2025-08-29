import { getCartItems } from "@/lib/actions/cart/cart.actions";
import CartTable from "./components/CartTable";

export const metadata = {
  title: "Shopping Cart",
};

const Cart = async () => {
  const cart = await getCartItems();
  return <CartTable cart={cart} />;
};

export default Cart;
