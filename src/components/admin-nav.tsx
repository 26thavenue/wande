"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  console.log(params);

  const routes = [
    {
      href: `/admin`,
      label: 'Overview',
      active: pathname === '/admin',
    },
    
    {
      href: `/admin/category`,
      label: 'CATEGORIES',
      active: pathname === `/admin/category`,
    },
  
    {
      href: `/admin/payments`,
      label: 'PAYMENT',
      active: pathname === `/${params.storeId}/payment`,
    },
    {
      href: `/admin/products`,
      label: 'Products',
      active: pathname === `/admin/products`,
    },
    {
      href: `/admin/orders`,
      label: 'Orders',
      active: pathname === `/admin/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Users',
      active: pathname === `/admin/users`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Inventory',
      active: pathname === `/admin/inventory`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};