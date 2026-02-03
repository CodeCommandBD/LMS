import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "../../lib/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

/**
 * Custom hook to update user profile
 * @returns {Object} Mutation result
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");

      // Invalidate profile query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      // Update Redux state
      if (data.user) {
        // Assuming the API returns the updated user object
        // dispatch(setUser({ user: data.user, role: data.user.role }));
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Update failed";
      toast.error(errorMessage);
    },
  });
};
