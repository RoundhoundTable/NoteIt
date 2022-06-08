import { Logo } from "../components/Logo";
import { FormInput } from "../components/FormInput";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Logo className="w-52 h-32" />
      <div className="mt-20">
        <div className="px-5 h-3">
          <h2 className="text-center bg-white inline-block w-14 font-bold">
            Login
          </h2>
        </div>
        <form
          className="flex flex-col border-2 rounded-md border-primary-500/30 w-80 pt-5 pl-5 pr-5 h-50 z-0"
          action=""
        >
          <FormInput label="Email" inputType="email" />
          <FormInput label="Password" inputType="password" />
          <div className="justify-center items-center">
            <button className="bg-primary-500 rounded font-semibold text-sm text-white relative inline-block px-6 h-8 w-full translate-y-1/2">
              Login
            </button>
          </div>
        </form>
        <h2 className="flex flex-col items-center justify-center mt-14">
          <a className="text-primary-500" href="">
            Te Olvidaste la contraseña?
          </a>
        </h2>
        <h2 className="flex flex-col items-center justify-center mt-8">
          No tienes una cuenta?{" "}
          <a className="text-primary-500" href="">
            Registrate
          </a>
        </h2>
      </div>
    </div>
  );
};
