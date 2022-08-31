export const firebaseErrors = {
  "auth/user-not-found": [
    {
      field: "email",
      message: "No existe un email registrado.",
    },
  ],
  "auth/wrong-password": [
    {
      field: "email",
      message: "Credenciales invalidas.",
    },
    {
      field: "password",
      message: "Credenciales invalidas.",
    },
  ],
};

export const joiMessages = {
  INVALID_EMAIL: "Debe ingresar un email valido.",
  PASSWORD_MIN_CHAR: "Debe tener al menos 6 caracteres.",
  EMPTY_FIELD: "No debe estar vacio.",
  NO_ALPHANUM: "Solo puede contener caracteres a-z A-Z 0-9.",
  PASSWORD_MISMATCHING: "Las contraseñas no coinciden.",
  MIN_CHAR: "Debe tener al menos 1 caracter.",
  DISPLAY_NAME_MAX_CHAR: "No puede tener mas de 30 caracteres.",
  COMMENT_MAX_CHAR: "No puede tener mas de 255 caracteres.",
  DESCRIPTION_MAX_CHAR: "No puede tener mas de 255 caracteres.",
};
