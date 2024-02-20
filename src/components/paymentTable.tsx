'use client'

import React from 'react';
import { PaymentType } from '@/lib/types';
import { getAllPayments } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export function PaymentTable() {
  const [data, setData] = React.useState<PaymentType[]>();

  React.useEffect(() => {
    getAllPayments()
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Table className="w-1/2">
        <TableHead className="bg-muted">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell className="text-right">Total</TableCell>
            <TableCell className="text-right">Status</TableCell>
            <TableCell className="text-right">Action</TableCell>
          </TableRow>
        </TableHead>
        {Array.isArray(data) && data.length ? (
          <TableBody>
            {data.map((payment: PaymentType) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.user?.name}</TableCell>
                <TableCell>{payment.user?.email}</TableCell>
                <TableCell className="text-right">{payment.amount}</TableCell>
                <TableCell className="text-right">{payment.status}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className="text-black" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem>Delete Category</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Payments Recorded
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default PaymentTable;
