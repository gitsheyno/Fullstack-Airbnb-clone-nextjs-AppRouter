"use client";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModel";
export default function UserMenu() {
  //----------------------------<< for Login >>----------------------------
  const loginModal = useLoginModal();
  //----------------------------<< for Register >>----------------------------
  const registerModel = useRegisterModal();

  //----------------------------<< State to Open The user Menu >>----------------------------
  const [isOpen, setIsOpen] = useState(false);

  //----------------------------<< Toggle the Menu >>----------------------------

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="/images/placeholder.jpg" />
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <MenuItem onClick={loginModal.onOpen} label="Login" />
          <MenuItem onClick={registerModel.onOpen} label="Sign up" />
        </>
      )}
    </div>
  );
}
