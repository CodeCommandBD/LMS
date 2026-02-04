import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../useRedux";
import { setAuthToken } from "../../lib/axios";
import * as api from "../../lib/api";

/**
 * Hook for User Login
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({ credentials, rememberMe }) => {
      // api.loginUser corresponds to export loginUser in lib/api.js
      // But let's check lib/api.js exports in Step 166.
      // It exports `loginUser`. useAuth.js was using `api.auth.login`.
      // The user might have an index.js in services or lib that structures it as api.auth.login?
      // Step 166 shows exports like `loginUser`, `registerUser`.
      // Step 264 useAuth.js used `api.auth.login`.
      // I need to be careful. The previous code in useAuth.js imported `api` from `../services/api`.
      // But Step 159 said `services` dir does not exist.
      // So `api.auth.login` calls were likely failing if run, or I missed something.
      // I will use `../../lib/api` and the named exports I saw in Step 166.

      const data = await api.loginUser(credentials);
      setAuthToken(data.token, data.refreshToken, rememberMe);
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
      const message = error.response?.data?.message || "Login failed";
      auth.loginFailure(message);
      toast.error(message);
    },
  });
};
