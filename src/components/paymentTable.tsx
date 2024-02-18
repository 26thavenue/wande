'use client'

import React from 'react'
import { PaymentType } from '@/lib/types'
import { getAllPayments } from '@/lib/data'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator'

import { MoreHorizontal } from 'lucide-react'


export  function PaymentTable()  {
  const[ data, setData] = React.useState([])
  React.useEffect(() => {
    getAllPayments().then((data) => { setData(data) }).catch((error) => { console.log(error) })
  }
  , [])
  // console.log(data);
  return (
    <div>
        
        <Table className='w-1/2'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className='bg-muted'>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data ? data.map((payment:PaymentType) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.user?.name}</TableCell>
            <TableCell>{payment.user?.email}</TableCell>
            <TableCell className="text-right">{payment.amount}</TableCell>
            <TableCell className="text-right">{payment.status}</TableCell>       
            <TableCell className="text-right flex justify-end ">
              <div>
                  <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className='text-black '/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>

                      <DropdownMenuItem>
                      Delete Category
                        
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
            
          </TableRow>
        )): <p>No Payments Recorded</p>}
        <TableCell className="text-right"></TableCell>
      </TableBody>
      
    </Table>
    </div>
  )
}

export default PaymentTable