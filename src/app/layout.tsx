import "./components/globals.css";
import Modal from "./components/modal/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import { Inter, Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "../app/components/modal/RegisterModal";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb-clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
