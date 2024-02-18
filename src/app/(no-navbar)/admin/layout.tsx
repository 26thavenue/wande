import {Navbar} from '@/components/admin-nav'
import React from 'react';
import Container from '@/components/Container'
import { Separator } from '@/components/ui/separator';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Container>
          <div className=''>
            <Navbar className=" p-6 justify-center uppercase" />
           <Separator className="w-screen "/>
          </div>
           
           <div className="">{children}</div>
        </Container>
       
      
      
    </div>
  );
}