"use client";
import Input from "../inputs/Input";
import Heading from "../Heading";
import axios from "axios";
import Button from "../Button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Modal from "./Modal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoadin, setIsLoading] = useState(false);

  //--------------------->> using form <<---------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //--------------------->> sending data to api <<---------------------

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //--------------------->> Modal Body <<---------------------

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to AirBnb" subTitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoadin}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
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
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2">
          <div>Already Have an account</div>
          <div
            onClick={registerModal.onClose}
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
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
