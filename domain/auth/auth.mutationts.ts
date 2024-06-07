import { useMutation } from "@tanstack/react-query";
import {
  signUp,
  signUpPasswordLess,
  confirmSignUp,
  resendCode,
  signIn,
  signInPasswordLess,
  confirmSignInPasswordless,
} from "./auth.store";

export function useSignUp(options: any) {
  return useMutation({
    ...options,
    mutationFn: signUp,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useSignUpPasswordless(options: any) {
  return useMutation({
    ...options,
    mutationFn: signUpPasswordLess,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useSignInPasswordless(options: any) {
  return useMutation({
    ...options,
    mutationFn: signInPasswordLess,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}
export function useSignIn(options: any) {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useConfirmSignUp(options: any) {
  return useMutation({
    mutationFn: confirmSignUp,
  });
}

export function useConfirmSignInPasswordless(options: any) {
  return useMutation({
    mutationFn: confirmSignInPasswordless,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useResendCode(options: any) {
  return useMutation({
    mutationFn: resendCode,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}
