import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { registerUser } from "../../lib/api";

/**
 * Custom hook for user registration (POST)
 * @returns {Object} Mutation result
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Automatic login if token is provided
      if (data.token && data.user) {
        dispatch(
          login({
            token: data.token,
            user: data.user,
            role: data.user.role || data.role,
          }),
        );
      }
      toast.success(data.message || "Registration successful!");

      // Navigate based on role or to login if no auto-login
      if (data.token) {
        const role = data.user?.role || data.role;
        if (role === "instructor") {
          navigate("/educator/dashboard");
        } else {
          navigate("/");
        }
      } else {
        navigate("/login");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed। আবার try করুন।";
      toast.error(errorMessage);
    },
  });
};
