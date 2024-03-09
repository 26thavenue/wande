import Image from 'next/image'


const Banner = () => {
    return (
        
           
                 <div className=" mt-10 h-3/4 mx-auto px-8 py-12 bg-black rounded-md flex flex-col-reverse gap-2 md:flex-row items-center justify-evenly">
                
                     <div className=" md:mb-0 text-center text-white w-full lg:w-1/2 xl:w-1/2">
                        <h1 className="uppercase text-xl lg:text-2xl  xl:text-3xl font-bold mb-4">Get your building materials  anyday at anytime</h1>
                         <h3 className="text-sm md:text-xl mb-2 font-[300]">Enjoy discounts on selected items</h3>
                     </div>
                    <Image src='/Socket-bg-remove.png' alt='banner' width={700} height={700} className='rounded-lg w-1/3 relative ' />

                 </div>    
                           
  
    
    );
}

export default Banner