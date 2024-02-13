import React from 'react'
import Container from './Container'
import { Facebook, Twitter} from 'lucide-react'
import Link from 'next/link'
import FooterList from './footer-list'
const Footer = () => {
  return (
    <div className='text-sm mt-16 bg-black text-white'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <p className='text-lg font-bold'>STORE</p>
            <Link href='/'>Home</Link>
            <Link href='/'>About</Link>
            <Link href='/'>Contact</Link>
          </FooterList>
          <FooterList>
            <p>Categories</p>
          </FooterList>
          
            <FooterList>
              <Facebook />
              <Twitter />
            </FooterList>
            
          

        </div>
      </Container>
    </div>
  )
}

export default Footer