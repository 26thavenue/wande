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


const AddCatgeoryButton = () => {
  return (
    <div>
         <Dialog>
      <DialogTrigger asChild>
        <Button >Add a new Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:w-[700px] lg:w-[700px] xl:w-[800px]">
        <DialogHeader>
          <DialogTitle>Add a new Category</DialogTitle>
          
        </DialogHeader>
        <form>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" value="" className="col-span-3" />
                </div>
            </div>
        </form>
        
        <DialogFooter>
          <Button type="submit">Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddCatgeoryButton