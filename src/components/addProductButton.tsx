import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const AddProductButton = () => {
  return (
    <div>
         <Dialog>
      <DialogTrigger asChild>
        <Button >Add a new Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:w-[700px] lg:w-[700px] xl:w-[800px]">
        <DialogHeader>
          <DialogTitle>Add a new Product</DialogTitle>
          
        </DialogHeader>
        <form>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" value="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                    Price
                    </Label>
                    <Input id="price" type="number" value="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Number In Stock
                    </Label>
                    <Input id="price" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Category
                    </Label>
                    <Input id="username" value="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Brand
                    </Label>
                    <Input id="username" value="" className="col-span-3" />
                </div>
            </div>
        </form>
        
        <DialogFooter>
          <Button type="submit">Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddProductButton