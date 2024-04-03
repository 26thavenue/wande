
const Container = ({children}:{children:any}) => {
    return (
        <div className=" max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4 container">
            {children}
        </div>
    )
}

export default Container