import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/slices/uiSlice";

/**
 * Internal hook to handle common mutation logic (invalidation, notifications, reset)
 */
const useEnhancedMutation = (mutationFn, options, resetFn) => {
  const {
    invalidateKeys = [],
    successMessage,
    errorMessage,
    resetOnSuccess,
    onSuccess,
    onError,
    ...mutationOptions
  } = options;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    onSuccess: async (data, variables, context) => {
      // 1. Invalidate queries
      if (invalidateKeys.length > 0) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }

      // 2. Show Success Notification
      if (successMessage) {
        dispatch(
          addNotification({
            type: "success",
            message: successMessage,
          }),
        );
      }

      // 3. Reset form
      if (resetOnSuccess && resetFn) {
        resetFn();
      }

      // 4. Custom callback
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // 1. Show Error Notification
      if (errorMessage !== false) {
        const message =
          typeof errorMessage === "string"
            ? errorMessage
            : error.response?.data?.message ||
              error.message ||
              "An error occurred";

        dispatch(
          addNotification({
            type: "error",
            message: message,
          }),
        );
      }

      // 2. Custom callback
      if (onError) {
        onError(error, variables, context);
      }
    },
    ...mutationOptions,
  });
};

export const useForm = (schema, mutationFn, options = {}) => {
  const { defaultValues, ...formOptions } = options;

  const form = useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
    ...formOptions,
  });

  const mutation = useEnhancedMutation(mutationFn, options, form.reset);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      // Error handled in onError
    }
  });

  return {
    ...form,
    handleSubmit,
    submitError: mutation.error?.message || null,
    submitSuccess: mutation.isSuccess,
    isSubmitting: mutation.isPending,
    errors: form.formState.errors,
    mutation,
  };
};

export const useSimpleForm = (initialValues = {}, mutationFn, options = {}) => {
  // Initialize React Hook Form
  const form = useReactHookForm({
    defaultValues: initialValues,
  });

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset: rhfReset,
    setValue,
    watch,
  } = form;

  // Watch all values to maintain 'values' prop compatibility
  const values = watch();

  const mutation = useEnhancedMutation(mutationFn, options, () =>
    rhfReset(initialValues),
  );

  // Manual handleChange for backward compatibility
  const handleChange = (name, value) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSubmit = rhfHandleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      // Handled in onError
    }
  });

  const reset = () => {
    rhfReset(initialValues);
    mutation.reset();
  };

  return {
    ...form, // Expose all RHF methods
    values, // Current values
    errors, // Form errors
    isSubmitting: mutation.isPending,
    submitError: mutation.error?.message || null,
    submitSuccess: mutation.isSuccess,
    handleChange, // Legacy compatibility
    handleSubmit, // RHF wrapped submit
    reset,
    setValues: (newValues) => rhfReset(newValues),
    setErrors: (newErrors) => {
      Object.keys(newErrors).forEach((key) => {
        form.setError(key, { message: newErrors[key] });
      });
    },
    mutation,
  };
};
