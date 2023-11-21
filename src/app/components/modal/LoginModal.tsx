"use client";
import { signIn } from "next-auth/react";
import Input from "../inputs/Input";
import Heading from "../Heading";

import Button from "../Button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Modal from "./Modal";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModel";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function LoginModal() {
  const router = useRouter();
  //--------------------->> Cheking Login Modal  <<---------------------
  const loginModal = useLoginModal();

  //--------------------->> Checking Register Modal  <<---------------------
  const registerModal = useRegisterModal();

  //--------------------->> Checking Status For POST REQ  <<---------------------

  const [isLoadin, setIsLoading] = useState(false);

  //--------------------->> using form <<---------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //--------------------->> Login functionality <<---------------------

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      console.log(callback);
      setIsLoading(false);
      console.log(data);
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  //--------------------->> Modal Body <<---------------------

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoadin}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoadin}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  //--------------------->> Modal Footer <<---------------------

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FaGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={FaGithub}
        onClick={() => {
          signIn("github");
        }}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2">
          <div>Already Have an account</div>
          <div
            onClick={loginModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoadin}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
