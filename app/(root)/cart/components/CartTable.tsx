"use client";

import { Cart } from "@/lib/types/cart.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ArrowRight, Loader, Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/actions/cart/cart.actions";
import { Item } from "@/lib/types/item.type";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const CartTable = ({ cart }: { cart?: Cart | null }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRemoveItem = async (item: Item) => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.id);
      if (res.success) {
        toast.success(`${item.name} removed from cart`);
      } else {
        toast.error(`${item.name} failed to remove from cart`);
      }
    });
  };

  const handleAddToCart = async (item: Item) => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (res.success) {
        toast.success(`${item.name} added to cart`);
      } else {
        toast.error(`${item.name} failed to add to cart`);
      }
    });
  };

  const handleCheckout = () => {
    startTransition(() => {
      router.push("/shipping-address");
    });
  };

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <Link href="/">Go Shopping</Link>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link
                        className="flex items-center"
                        href={`/product/${item.slug}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleRemoveItem(item)}
                      >
                        {item.quantity === 1 ? <Trash /> : <Minus />}
                      </Button>
                      {item.quantity}
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleAddToCart(item)}
                      >
                        <Plus />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal (
                {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                ):
                <span className="font-bold ml-2">
                  {formatCurrency(
                    cart.items.reduce(
                      (acc, item) => acc + Number(item.price) * item.quantity,
                      0
                    )
                  )}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={handleCheckout}
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
