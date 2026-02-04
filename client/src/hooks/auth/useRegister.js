import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../useRedux";
import { setAuthToken } from "../../lib/axios";
import * as api from "../../lib/api";

/**
 * Hook for User Registration
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return useMutation({
    mutationFn: async (userData) => {
      const data = await api.registerUser(userData);
      setAuthToken(data.token, data.refreshToken);
      return data;
    },
    onMutate: () => {
      auth.loginStart();
    },
    onSuccess: (data) => {
      auth.loginSuccess({
        user: data.user,
        role: data.role,
      });
      toast.success(data.message || "Registration successful!");

      // Navigate based on role
      const role = data.user?.role || data.role;
      if (role === "instructor") {
        navigate("/educator/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Registration failed";
      auth.loginFailure(message);
      toast.error(message);
    },
  });
};
