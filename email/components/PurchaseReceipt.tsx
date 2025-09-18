import { Order } from "@/lib/types/order.type";
import { formatCurrency } from "@/lib/utils";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const dateFormater = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

const PurchaseReceiptEmail = ({ order }: { order: Order }) => {
  const totals = [
    { name: "Items", price: order.itemsPrice },
    { name: "Tax", price: order.taxPrice },
    { name: "Shipping", price: order.shippingPrice },
    { name: "Total", price: order.totalPrice },
  ];

  return (
    <Html>
      <Preview>Your receipt from Art Store</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Thank you for your purchase!</Heading>

            {/* Header details: Section -> Row -> Column */}
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap">
                    Order ID:
                  </Text>
                  <Text className="mt-0 mr-4">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap">
                    Order Date:
                  </Text>
                  <Text className="mt-0 mr-4">
                    {dateFormater.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap">
                    Price Paid:
                  </Text>
                  <Text className="mt-0 mr-4">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className="border border-solid border-gray-200 rounded p-4 mt-4">
              <Heading className="text-lg font-medium mb-2">
                Order Details
              </Heading>

              {/* Items list: Row -> Column OK */}
              {order.orderItems.map((item) => (
                <Row
                  key={item.productId}
                  className="border-b border-solid border-gray-200 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0"
                >
                  <Column className="w-16">
                    <Img
                      width={80}
                      src={item.image}
                      alt={item.name}
                      className="rounded"
                    />
                  </Column>
                  <Column>
                    <Text className="font-medium">{item.name}</Text>
                    <Text className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </Text>
                  </Column>
                  <Column>
                    <Text className="font-medium">
                      {formatCurrency(Number(item.price) * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}

              {/* Totals: ensure Row contains Columns */}
              {totals.map((t) => (
                <Row key={t.name} className="last:mb-0">
                  <Column>
                    <Text className="text-gray-500">{t.name}</Text>
                  </Column>
                  <Column>
                    <Text
                      className="font-medium"
                      style={{ textAlign: "right" }}
                    >
                      {formatCurrency(t.price)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    orderItems: [
      {
        productId: crypto.randomUUID(),
        name: "Sample Product 1",
        quantity: 2,
        image: "https://via.placeholder.com/150",
        price: 29.99,
      },
      {
        productId: crypto.randomUUID(),
        name: "Sample Product 2",
        quantity: 1,
        image: "https://via.placeholder.com/150",
        price: 49.99,
      },
    ],
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      postalCode: "12345",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    itemsPrice: 109.97,
    taxPrice: 8.25,
    shippingPrice: 5.0,
    totalPrice: 123.22,
    isPaid: true,
    paidAt: new Date(),
    isDelivered: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export default PurchaseReceiptEmail;
