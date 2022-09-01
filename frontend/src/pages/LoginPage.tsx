import { Logo } from "../components/Logo";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { login } from "../graphql/mutations/login";
import { AuthContext, useAuth } from "../context/AuthProvider";
import { BUTTONS, NoteItButton } from "../components/NoteIt/Button";
import { NoteItInput } from "../components/NoteIt/Input";
import { useForm } from "../hooks/useForm";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { signIn, currentUser } = useAuth() as AuthContext;
  const navigateTo = useNavigate();
  const { form, onChange, errors, resetErrors, onError } =
    useForm<ILoginForm>();
  const [Login, { data }] = useMutation(login, {
    onError,
  });

  const submit = (ev: any) => {
    ev.preventDefault();
    resetErrors();

    Login({
      variables: {
        credentials: {
          email: form?.email,
          password: form?.password,
        },
      },
    });
  };

  useEffect(() => {
    (async () => {
      if (data) {
        await signIn(data.login);
        navigateTo(0);
      }
    })();
  }, [data]);

  if (currentUser) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center justify-center">
      <Logo className="w-44" />
      <div className="mt-10">
        <div className="px-5 h-3">
          <h2 className="text-center bg-white inline-block w-20 font-bold text-primary-700/50">
            Log In
          </h2>
        </div>
        <form
          className="flex flex-col border-2 rounded-md border-primary-400/30 w-80 pt-5 pl-5 pr-5 h-50 z-0"
          method="post"
          onSubmit={submit}
        >
          <NoteItInput
            label="Email"
            name="email"
            onChange={onChange}
            type="email"
            error={{ message: errors?.email }}
          />
          <NoteItInput
            label="Password"
            name="password"
            onChange={onChange}
            type="password"
            error={{ message: errors?.password }}
          />
          <div className="flex flex-col items-center">
            <NoteItButton
              type={BUTTONS.PRIMARY}
              className="mt-5 font-semibold text-sm relative inline-block h-8 w-4/5 translate-y-1/2"
            >
              Login
            </NoteItButton>
          </div>
        </form>
        <h2 className="flex flex-row items-center justify-center mt-10 font-light text-primary-700">
          Don't have an account?
          <Link
            to="/account/register"
            className="ml-2 text-primary-500 font-bold"
          >
            Register
          </Link>
        </h2>
      </div>
    </div>
  );
};
