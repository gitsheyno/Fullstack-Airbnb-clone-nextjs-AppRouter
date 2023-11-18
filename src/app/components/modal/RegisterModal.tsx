"use client";
import Input from "../inputs/Input";
import Heading from "../Heading";
import axios from "axios";
import Modal from "./Modal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

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
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //--------------------->> Modal Body <<---------------------

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to AirBnb" subTitle="Create an account" />
      <Input />
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
    />
  );
}
