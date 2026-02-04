import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

/**
 * Enhanced form hook with Zod validation and submission handling via TanStack Query
 * @param {object} schema - Zod validation schema
 * @param {Function} mutationFn - Submit handler (mutation function)
 * @param {object} options - Additional options
 */
export const useForm = (schema, mutationFn, options = {}) => {
  const { defaultValues, resetOnSuccess, onSuccess, onError, ...formOptions } =
    options;

  const form = useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
    ...formOptions,
  });

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data, variables, context) => {
      if (resetOnSuccess) {
        form.reset();
      }
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
    },
    ...options.mutationOptions, // Support extra mutation options
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    // We use mutateAsync to allow the form submission to wait for the mutation
    // This maintains compatibility with logic that might await handleSubmit
    // and also allows RHF to handle exceptions if needed
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      // Error is handled in onError, but we catch here to prevent unhandled rejection warning
      // if the parent does not catch it.
      // Intentionally empty or simple log if needed.
    }
  });

  return {
    ...form,
    handleSubmit,
    submitError: mutation.error?.message || null,
    submitSuccess: mutation.isSuccess,
    isSubmitting: mutation.isPending,
    errors: form.formState.errors,
    mutation, // Expose full mutation object for advanced usage
  };
};

/**
 * Simple form hook for basic forms via TanStack Query
 */
/**
 * Simple form hook for basic forms via TanStack Query + React Hook Form
 */
export const useSimpleForm = (initialValues = {}, mutationFn, options = {}) => {
  const { resetOnSuccess, onSuccess, onError, ...mutationOptions } = options;

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

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data, variables, context) => {
      if (resetOnSuccess) {
        rhfReset(initialValues);
      }
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // If server returns validation errors, we could map them here manually if needed
      if (onError) {
        onError(error, variables, context);
      }
    },
    ...mutationOptions,
  });

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
