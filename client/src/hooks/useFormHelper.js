import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/**
 * Enhanced form hook with Zod validation and submission handling
 * @param {object} schema - Zod validation schema
 * @param {Function} onSubmit - Submit handler
 * @param {object} options - Additional options
 */
export const useForm = (schema, onSubmit, options = {}) => {
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: options.defaultValues || {},
    ...options,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);

      const result = await onSubmit(data);

      setSubmitSuccess(true);

      if (options.resetOnSuccess) {
        form.reset();
      }

      return result;
    } catch (error) {
      setSubmitError(error.message || "An error occurred");

      if (options.onError) {
        options.onError(error);
      }

      throw error;
    }
  });

  return {
    ...form,
    handleSubmit,
    submitError,
    submitSuccess,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};

/**
 * Simple form hook for basic forms without Zod
 */
export const useSimpleForm = (initialValues = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setIsSubmitting(true);
      setErrors({});
      await onSubmit(values);
    } catch (error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  };
};
