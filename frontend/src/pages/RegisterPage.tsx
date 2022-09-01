import { Logo } from "../components/Logo";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { register } from "../graphql/mutations/register";
import { AuthContext, useAuth } from "../context/AuthProvider";
import { BUTTONS, NoteItButton } from "../components/NoteIt/Button";
import { NoteItInput } from "../components/NoteIt/Input";
import { useForm } from "../hooks/useForm";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const { signUp, currentUser } = useAuth() as AuthContext;
  const { form, onChange, errors, resetErrors, onError } =
    useForm<IRegisterForm>();
  const navigateTo = useNavigate();
  const [Register, { data }] = useMutation(register, {
    onError,
  });

  const submit = async (ev: any) => {
    ev.preventDefault();

    resetErrors();

    await Register({
      variables: {
        credentials: {
          ...form,
        },
      },
    });
  };

  useEffect(() => {
    (async () => {
      if (data) {
        await signUp(data.register);
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
            Sign Up
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
            type={"email"}
            onChange={onChange}
            error={{ message: errors?.email }}
          />
          <NoteItInput
            label="Username"
            name="username"
            type={"text"}
            onChange={onChange}
            error={{ message: errors?.username }}
          />
          <NoteItInput
            label="Password"
            name="password"
            type={"password"}
            onChange={onChange}
            error={{ message: errors?.password }}
          />
          <NoteItInput
            label="Confirm Password"
            name="confirmPassword"
            type={"password"}
            onChange={onChange}
            error={{ message: errors?.confirmPassword }}
          />
          <div className="flex flex-col items-center">
            <NoteItButton
              type={BUTTONS.PRIMARY}
              className="mt-5 font-semibold text-sm relative inline-block h-8 w-4/5 translate-y-1/2"
            >
              Sign Up
            </NoteItButton>
          </div>
        </form>
        <h2 className="flex flex-row items-center justify-center mt-10 font-light text-primary-700">
          Have an account?
          <Link to="/account/login" className="ml-2 text-primary-500 font-bold">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};
