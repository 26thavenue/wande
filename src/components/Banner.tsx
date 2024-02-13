import Image from 'next/image'

const Banner = () => {
    return (
        <div className="relative my-8 bg-black text-white rounded-xl ">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md;mb-0 text-center">
                    <h1 className="text-3xl font-bold mb-4">Get your building materials shipped to you anyday at anytime</h1>
                    <h3 className="text-lg md:text-xl mb-2">Enjoy discounts on selected items</h3>
                </div>
                <Image src='/socket.jpg' alt='banner' width={500} height={500} className='rounded-lg w-1/3 relative ' />


            </div>
        </div>
    );
}

export default Banner