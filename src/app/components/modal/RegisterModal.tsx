"use client";
import axios from "axios";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoadin, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};
  return <div>RegisterModal</div>;
}
