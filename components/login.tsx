// import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from "react";
// import { Lightning, LockClosedIcon } from "@/components/ui/icons";

// import { useSignIn } from "@/domain/auth/auth.mutations";
import { useQueryClient } from "@tanstack/react-query";

import { queryIds as authQueryIds } from "@/domain/auth/queryIds";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { useSignIn } from "@/domain/auth/auth.mutationts";
import { currentAuthUserQueryId } from "@/domain/auth/auth.queries";
import { listTablesQueryId } from "./tables-list";

enum RegistrationViewTypes {
  login,
  confirmLogin,
  userExists,
  codeSent,
}

export function Login() {
  const [username, setUserName] = useState("");
  // const [username, setUserName] = useState("");
  const [code, setCode] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [password, setPassword] = useState("");
  const [viewType, setViewtype] = useState(RegistrationViewTypes.login);

  const queryClient = useQueryClient();

  const router = useRouter();

  const useSignInMutation = useSignIn({
    onSuccess: (data: any) => {
      setAuthUser(data);
      // setViewtype(RegistrationViewTypes.confirmLogin);

      //   @ts-ignore
      queryClient?.invalidateQueries([currentAuthUserQueryId]);
      //   @ts-ignore
      queryClient?.invalidateQueries([listTablesQueryId]);
      router.push("/");
    },
    onError: (err: any) => {
      console.error("ERROR YO", err.message);
      if (err.message === "User already exists") {
        // useResendCodeMutation.mutate(username)
      }
    },
  });

  return (
    <>
      <div className="min-h-full flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Icons.bolt className="dark:text-rose-800 text-rose-500 mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
              Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
              Or{" "}
              <a
                href="/register"
                className="font-medium text-rose-500 hover:text-rose-400"
              >
                create a new account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  // autoComplete='email'
                  value={username}
                  onChange={(event) => {
                    setUserName(() => event.target.value);
                  }}
                  required
                  className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  // autoComplete='email'
                  value={password}
                  onChange={(event) => {
                    setPassword(() => event.target.value);
                  }}
                  required
                  className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                onClick={(event) => {
                  event.preventDefault();

                  useSignInMutation.mutate({
                    username,
                    password,
                  });
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Icons.lock
                    className="h-5 w-5 text-rose-400 group-hover:text-rose-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
