import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getShippingAddressByUserId } from "@/lib/actions/shipping-address/shipping-address.action";
import { formatDate } from "@/lib/helpers/format-date";
import { Order } from "@/lib/types/order.type";
import { formatCurrency, formatId } from "@/lib/utils";
import OrderItemsTable from "./OrderItemsTable";

import ProtectedResource from "@/components/widgets/protected-resource/ProtectedResource";
import { ChangePaymentStatus } from "@/components/widgets/change-payment-status/ChangePaymentStatus";
import { ChangeDeliveryStatusWrapper } from "@/components/widgets/change-delivery-status/ChangeDeliveryStatus";

type ShippingAddressCardProps = {
  userId: Order["userId"];
  isDelivered: Order["isDelivered"];
  orderId: Order["id"];
  isPaid: Order["isPaid"];
};

const ShippingAddressCard = async ({
  userId,
  isDelivered,
  orderId,
  isPaid,
}: ShippingAddressCardProps) => {
  const { data: shippingAddress } = await getShippingAddressByUserId(userId);

  if (!shippingAddress) return null;

  return (
    <Card className="my-4">
      <CardContent className="p-4 gap-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl pb-4">Shipping Address</h2>
          <ProtectedResource>
            <ChangeDeliveryStatusWrapper
              id={orderId}
              isDelivered={isDelivered}
              isDisabled={!isPaid}
            />
          </ProtectedResource>
        </div>
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

const OrderDetail = ({ order }: { order: Order }) => {
  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>

      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-4 md:col-span-2 space-4-y overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-xl pb-4">Payment Method</h2>
                <ProtectedResource>
                  <ChangePaymentStatus id={order.id} isPaid={order.isPaid} />
                </ProtectedResource>
              </div>
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
            orderId={order.id}
            isPaid={order.isPaid}
          />
          <Card className="my-4">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <OrderItemsTable orderItems={order.orderItems} />
            </CardContent>
          </Card>
        </div>
        <Card className="md:col-span-1 h-fit col-span-4">
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
    </>
  );
};

export default OrderDetail;
