import { useState } from "react";
import { deletePost } from "../actions/delete-post";
import { toast } from "sonner";
import { AuthError } from "@/modules/auth/errors/auth_error";

export const useHandleDbPost = () => {
  const [state, setState] = useState({
    isDeleting: false,
  });

  async function handleDeletePost(id: string) {
    setState((prev) => ({
      ...prev,
      isDeleting: true,
    }));

    try {
      const result = await deletePost(id);

      if (result) {
        setState((prev) => ({
          ...prev,
          isDeleting: false,
        }));
        toast.success("Post deleted successfully", {
          description: `The post with id ${id} has been deleted`,
          duration: 5000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
          duration: 5000,
        });
      } else if (error instanceof AuthError) {
        toast.error("Unauthorized", {
          description: error.message,
          duration: 5000,
        });
      } else {
        toast.error("Unknown error", {
          description: "An unknown error occurred...",
          duration: 5000,
        });
      }
    } finally {
      setState((prev) => ({
        ...prev,
        isDeleting: false,
      }));
    }
  }

  return {
    state,
    handleDeletePost,
  };
};
