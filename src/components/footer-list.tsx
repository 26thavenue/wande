interface FooterListProps {
    children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
            {children}
        </div>
    )
}

export default FooterList