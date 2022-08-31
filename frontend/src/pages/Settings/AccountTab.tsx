import { BUTTONS, NoteItButton } from "../../components/NoteIt/Button";

export const AccountTab = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="text-2xl text-primary-500 font-semibold">
          Correo Electrónico
        </p>
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            className="font-semibold text-primary-500 px-3 mt-2 h-11 border-2 border-primary-500 rounded"
          />
        </div>
      </div>
      <div className="mt-5">
        <p className="text-2xl text-primary-500 font-semibold">Contraseña</p>
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            className="font-semibold text-primary-500 px-3 mt-2 h-11 border-2 border-primary-500 rounded"
          />
        </div>
      </div>
      <NoteItButton type={BUTTONS.PRIMARY} className="w-full md:w-60 mt-5">
        Guardar Cambios
      </NoteItButton>
      <NoteItButton
        type={BUTTONS.DANGER}
        className="w-full md:w-60 mt-10 md:mt-16"
      >
        Eliminar Cuenta
      </NoteItButton>
    </div>
  );
};
