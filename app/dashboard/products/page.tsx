import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { UserIcon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "@/app/lib/db";
import Image from "next/image";

async function getData() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function ProductsRoute() {
  const data = await getData();
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex items-center gap-x-2">
          <Link href="/dashboard/products/create">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Mange your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.images[0]}
                      alt="product image"
                      height={64}
                      width={64}
                      className="rounded-md object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="w-4 h-4">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${item.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${item.id}/delete`}>Delete</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
