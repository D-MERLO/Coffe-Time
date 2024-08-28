export const validate = (input) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const usernameRegex = /^(?=.*[A-Z])[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(input.email)) {
        errors.email = "Ingresa un email válido."
    }
    // if (!passwordRegex.test(input.password)) {
    //     errors.password = "La contraseña debe contener al menos 8 caracteres, una minúscula, una mayúscula y un número."
    // }
    if (input.nDni && input.nDni.length !== 8) {
        errors.nDni = "Coloca tu número de DNI, debe tener 8 números, sin puntos ni espacios."
    }
    if (!(input.password === input.repeatPassword)) {
        errors.repeatPassword = "Las contraseñas deben ser idénticas entre sí."
    }
    // if (!usernameRegex.test(input.username)) {
    //     errors.username = "El nombre de usuario debe tener al menos 8 dígitos y al menos una mayúscula.";
    // }

    return errors;
}