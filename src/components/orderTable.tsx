'use client'

import React from 'react'
import { OrderType } from '@/lib/types'
import { getAllOrders } from '@/lib/data'
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


export  function OrderTable()  {
  const[ data, setData] = React.useState<OrderType[] | null>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrders()
      setData(data)
    }
    fetchData()
  }, [])
  // console.log(data);
  return (
    <div>
        
        <Table className='w-1/2'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className='bg-muted'>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead className="text-right">Phone number</TableHead>
          <TableHead className="text-right">Address</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data ? data.map((order:OrderType) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.user?.name}</TableCell>
            <TableCell>{order.user?.email}</TableCell>
            <TableCell className="text-right">{order.amount}</TableCell>
            <TableCell className="text-right">{order.phone}</TableCell>
            <TableCell className="text-right">{order.address}</TableCell>         
        
            <TableCell className="text-right flex justify-end ">
              <div>
                  <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className='text-black '/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>

                      <DropdownMenuItem>
                      Delete Order
                        
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
            
          </TableRow>
        )): <p>No Orders Recorded</p>}
        <TableCell className="text-right"></TableCell>
      </TableBody>
      
    </Table>
    </div>
  )
}

export default OrderTable