'use client'
 
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
const links = [
    {
        name: 'Dashboard',
        href: "/dashboard",
    },
    {
        name: "Orders",
        href: "/dashboard/orders",
    },
    {
        name: "Products",
        href: "/dashboard/products"
    },
    {
        name: "Banner Picture",
        href: "/dashboard/banner",
    }
]

export function DashboardNavigation() {
    const pathname = usePathname();
  return (
    <>
        {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(link.href === pathname ? 'text-black' : 'text-muted-foreground hover:text-foreground')}>
                {link.name}
            </Link>
        ))}
    </>
  )
}
