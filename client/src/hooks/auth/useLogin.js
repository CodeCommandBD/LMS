import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { loginUser } from "../../lib/api";

/**
 * Custom hook for user login (POST)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token and user data in Redux and localStorage
      if (data.token && data.user) {
        dispatch(
          login({
            token: data.token,
            user: data.user,
            role: data.user.role || data.role,
          }),
        );
      }
      toast.success(data.message || "Login successful!");

      // Navigate based on role
      const role = data.user?.role || data.role;
      if (role === "instructor") {
        navigate("/educator/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed। আবার try করুন।";
      toast.error(errorMessage);
    },
  });
};
