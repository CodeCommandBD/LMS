import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../useRedux";
import * as api from "../../lib/api";

/**
 * Hook for Profile Updates
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (data.user) {
        auth.setUser({ user: data.user, role: data.user.role || auth.role });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};
