import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "../lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../actions/sign-up";
import { toast } from "sonner";

type SignUpFormData = z.infer<typeof SignUpSchema>;

export const useSignUp = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      const result = await signUp(data);

      if (result?.success === false) {
        toast.error(result.errors, {
          description: "Please, try again...",
          duration: 10000
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          description: "Try again later...",
        });
      }
    }
  }

  return {
    form,
    onSubmit,
  };
};
