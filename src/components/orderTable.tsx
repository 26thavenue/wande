'use client'

import React from 'react';
import { OrderType } from '@/lib/types';
import { getAllOrders } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export function OrderTable() {
  const [data, setData] = React.useState<OrderType[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrders();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Table className="w-1/2">
        <TableHead className="bg-muted">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell className="text-right">Phone number</TableCell>
            <TableCell className="text-right">Address</TableCell>
            <TableCell className="text-right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length ? (
            data.map((order: OrderType) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.user?.name}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell className="text-right">{order.phoneNumber}</TableCell>
                <TableCell className="text-right">{order.address}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className="text-black" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem>Delete Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Orders Recorded
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderTable;
