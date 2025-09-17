import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderSummary } from "@/lib/actions/order/order.actions";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Metadata } from "next";
import Charts from "./components/Charts";
import SalesTable from "./components/SalesTable";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

const CardSection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const DashboardPage = async () => {
  const { data: summary } = await getOrderSummary();

  if (!summary) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-2">
      <h1 className="h2-bold text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardSection title="Total Revenue">
          <div className="text-2xl font-bold">
            {formatCurrency(summary.totalSales ?? 0)}
          </div>
        </CardSection>
        <CardSection title="Sales">
          <div className="text-2xl font-bold">
            {formatNumber(summary.ordersCount ?? 0)}
          </div>
        </CardSection>
        <CardSection title="Customers">
          <div className="text-2xl font-bold">
            {formatNumber(summary.usersCount ?? 0)}
          </div>
        </CardSection>
        <CardSection title="Products">
          <div className="text-2xl font-bold">
            {formatNumber(summary.productsCount ?? 0)}
          </div>
        </CardSection>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-bold">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts data={summary.salesData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="font-bold">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesTable sales={summary.latestSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
