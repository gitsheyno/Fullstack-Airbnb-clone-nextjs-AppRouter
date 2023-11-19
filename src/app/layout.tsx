import "./components/globals.css";
import LoginModal from "./components/modal/LoginModal";
import Modal from "./components/modal/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import { Inter, Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "../app/components/modal/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb-clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUSer = await getCurrentUser();
  console.log(currentUSer);
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
