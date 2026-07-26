
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "./nexttoast";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VidhanSolanki",
  description: "Developer & Programmer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <link rel="icon" type="./app/jpeg" href="./app/avatar.jpeg"></link>
      <body className={inter.className}>{children}
    <ToastContainer/>
    </body>
    </html>
  );
}
