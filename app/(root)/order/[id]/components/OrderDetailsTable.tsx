import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getShippingAddressByUserId } from "@/lib/actions/shipping-address/shipping-address.action";
import { formatDate } from "@/lib/helpers/format-date";
import { Order } from "@/lib/types/order.type";
import { formatCurrency, formatId } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ShippingAddressCard = async ({
  userId,
  isDelivered,
}: {
  userId: Order["userId"];
  isDelivered: Order["isDelivered"];
}) => {
  const { data: shippingAddress } = await getShippingAddressByUserId(userId);

  if (!shippingAddress) return null;

  return (
    <Card className="my-4">
      <CardContent className="p-4 gap-4">
        <h2 className="text-xl pb-4">Shipping Address</h2>
        <p>
          {shippingAddress.addressLine1}, {shippingAddress.city},{" "}
          {shippingAddress.state} {shippingAddress.postalCode}
        </p>
        <div className="my-2">
          {isDelivered ? (
            <Badge variant="secondary">Delivered</Badge>
          ) : (
            <Badge variant="destructive">Not Delivered</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const OrderDetailsTable = ({ order }: { order: Order }) => {
  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>

      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-4-y overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{order.paymentMethod}</p>
              <div className="my-2">
                {order.isPaid ? (
                  <Badge variant="secondary">
                    Paid at {formatDate(order.paidAt)}
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Paid</Badge>
                )}
              </div>
            </CardContent>
          </Card>
          <ShippingAddressCard
            userId={order.userId}
            isDelivered={order.isDelivered}
          />
          <Card className="my-4">
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
                  {(order.orderItems ?? []).map((item) => (
                    <TableRow key={item.slug}>
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
          <Card className="my-4">
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(order.totalPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(order.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping Price</div>
                <div>{formatCurrency(order.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(order.totalPrice)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
