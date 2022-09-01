import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthProvider";

export const NavDropdown = () => {
  const { currentUser, signOut } = useAuth() as AuthContext;
  const navigateTo = useNavigate();

  const logout = () => {
    signOut();
    navigateTo("/");
  };

  return (
    <>
      <Link to={`u/${currentUser!.username}`}>
        <li>
          <div className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full">
            <Icon className="w-6 h-6" icon="bxs:user-circle" />
            Perfil
          </div>
        </li>
      </Link>
      <Link to="/account/settings">
        <li>
          <button className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full">
            <Icon className="w-6 h-6" icon="fa6-solid:gear" />
            Configuracion
          </button>
        </li>
      </Link>
      <li>
        <button
          className="p-2 font-semibold text-danger-500 flex flex-row gap-1 justify-center items-center w-full"
          onClick={logout}
        >
          <Icon className="w-6 h-6" icon="material-symbols:logout-rounded" />
          Cerrar sesión
        </button>
      </li>
    </>
  );
};
