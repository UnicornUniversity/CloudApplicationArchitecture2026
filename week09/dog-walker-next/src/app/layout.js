import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import "./bootstrap.min.css";
import NavBar from "@/components/NavBar";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Dog Walker",
    description: "This is app for dog owners",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
            <NavBar/>
            <div className="container">
                {children}
            </div>
        </body>
        </html>
    );
}
