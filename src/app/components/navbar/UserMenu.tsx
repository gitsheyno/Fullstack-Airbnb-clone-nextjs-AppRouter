"use client";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModel";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

type NavbarProps = {
  currentUser: User | null;
};

export default function UserMenu({ currentUser }: NavbarProps) {
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
        <div
          className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Login" onClick={() => {}} />
                <MenuItem label="Sign up" onClick={() => {}} />
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservatrions" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb My home" onClick={() => {}} />
                <hr />
                <MenuItem label="Logout" onClick={signOut} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModel.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
