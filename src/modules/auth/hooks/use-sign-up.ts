import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormSchema } from "../lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../actions/sign-up";
import { toast } from "sonner";

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const useSignUp = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
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
        toast.error(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return {
    form,
    onSubmit,
  };
};
