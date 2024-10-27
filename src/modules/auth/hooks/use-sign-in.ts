import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "../lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../actions/sign-in";
import { toast } from "sonner";

type SignInFormData = z.infer<typeof SignInSchema>;

export const useSignIn = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormData) {
    try {
      const result = await signIn(data);

      if(result?.success === false) {
        toast.error(result.errors);
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
