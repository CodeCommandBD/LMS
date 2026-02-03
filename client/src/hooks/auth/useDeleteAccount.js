import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAccount } from "../../lib/api";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to delete account
 * @returns {Object} Mutation result
 */
export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast.success(data.message || "Account deleted successfully!");
      dispatch(logout());
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      toast.error(errorMessage);
    },
  });
};
