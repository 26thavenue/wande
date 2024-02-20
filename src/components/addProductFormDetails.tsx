'use server'

import React,{useEffect,useState} from 'react'
import { createProducts, getAllCategories } from '@/lib/data'
import Container from '@/components/Container'
import { CategoryType } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormProps{
    data:any
}
const AddProductFormDetails:React.FC<FormProps>= ({data}) => {

  return (
    <div>
        <Container>
            <form action={createProducts}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" name="price" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description"  />
                </div>
                <div>
                    <label htmlFor="image">imageUrl</label>
                    <input type="url" id="image" name="image" />// Change it to file later
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" name="brand" placeholder='Enter your brand' />
                </div>
                <div>
                    <label htmlFor="brand">Number In Stock</label>
                    <input type="number" id="numberInStock" name="brand" placeholder='Enter the amount of these products' />
                </div>
                <div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {data ? data.map((category:CategoryType) => (
                                <SelectGroup key={category.id}>
                                    <SelectItem value={category.name} className="font-medium">{category.name}</SelectItem>
                                </SelectGroup>
                                )): <p>No Category</p>
                            }
                            
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </Container>
    </div>
  )
}

export default AddProductFormDetails