import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "./ui/toaster";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
                <Header />
                <div className="space-y-8 w-full">
                    {children}
                </div>
                <Toaster />
                <Footer />
            </div>
        </>
    );
};

export default Layout;
