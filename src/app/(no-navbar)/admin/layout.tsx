'use client'

import {Navbar} from '@/components/admin-nav'
import React from 'react';
import Container from '@/components/Container'
import { Separator } from '@/components/ui/separator';
import {  getUserById } from '@/lib/data';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import { useUser } from '@clerk/nextjs';
import { PuffLoader } from 'react-spinners';

export default function Layout({ children }: { children: React.ReactNode }) {
   const [loading, setLoading] = useState(true); // Set loading to true initially
   const router = useRouter();
   const { user } = useUser();
   const userId = user?.id;

    useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await getUserById(userId);
          if (userData.role.toLowerCase() !== 'admin') {
            router.push('/');
          } else {
            setLoading(false); // Set loading to false after successful user check
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false in case of error
        router.push('/');
      }
    };

    fetchData(); // Call the fetchData function
  }, [userId, router]); 

  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <PuffLoader color="#b6b6b6" className="mx-auto" />
          </div>
          ) : (
            <Container>
              <div className=''>
                <Navbar className=" p-6 justify-center uppercase" />
              <Separator className="w-screen "/>
              </div>
              
              <div className="">{children}</div>
            </Container>
          )}
        
       
      
      
    </div>
  );
}