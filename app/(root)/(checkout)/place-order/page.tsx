import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/widgets/container/Container";
import CheckoutHeading from "@/components/widgets/checkout-heading/CheckoutHeading";
import { getCartItems } from "@/lib/actions/cart/cart.actions";
import { getShippingAddressByUserId } from "@/lib/actions/shipping-address/shipping-address.action";
import { getSessionUser, getUserById } from "@/lib/actions/user/user.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PlaceOrderButton from "./components/PlaceOrderButton";

export const metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getCartItems();
  const sessionUser = await getSessionUser();

  if (!cart || cart.items.length === 0) {
    return redirect("/cart");
  }

  if (!sessionUser) {
    return redirect("/login");
  }

  const { data: user } = await getUserById(sessionUser.id);
  const { data: address } = await getShippingAddressByUserId(sessionUser?.id);

  if (!address) {
    return redirect("/shipping-address");
  }
  if (!user?.paymentMethod) {
    return redirect("/payment-methods");
  }

  return (
    <Container className="max-w-2xl mx-auto px-4">
      <CheckoutHeading
        title="Place Order"
        description="Please confirm your order details."
      />
      <div className="flex flex-col gap-4">
        <div className="md:col-span-2 overflow-x-auto space-4 flex flex-col gap-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4"> Shipping address</h2>
              <p className="text-sm">{address.fullName},</p>
              <p className="text-sm">
                {address.city} {address.postalCode}, {address.country}{" "}
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment method</h2>
              <p className="text-sm">{user.paymentMethod}</p>
              <div className="mt-3">
                <Link href="/payment-methods">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-left">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(cart.items ?? []).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-left">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="ml-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-left">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="p-4 gap-4 space-y-4">
            <div className="flex justify-between">
              <div>Items</div>
              <div>{formatCurrency(cart.totalPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div>Tax</div>
              <div>{formatCurrency(cart.taxPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div>Shipping Price</div>
              <div>{formatCurrency(cart.shippingPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div>Total</div>
              <div>{formatCurrency(cart.totalPrice)}</div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <PlaceOrderButton />
        </div>
      </div>
    </Container>
  );
};

export default PlaceOrderPage;
