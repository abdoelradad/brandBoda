import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCopmonents } from "../components/dashboard/DashboardCopmonents";
import { RecentSales } from "../components/dashboard/RecentSales";
import { Chart } from "../components/dashboard/Chart";
import prisma from "../lib/db";

async function getData() {
  const now = new Date();
  const sevenDays = new Date();
  sevenDays.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDays,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));

  return result;
}

export default async function Dashboard() {
  const data = await getData();
  return (
    <>
      <DashboardCopmonents />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={data} />
        </CardContent>
      </Card>
      <RecentSales />
      </div>
    </>
  );
}