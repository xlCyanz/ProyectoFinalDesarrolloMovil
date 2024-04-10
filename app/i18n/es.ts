const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  loginScreen: {
    signIn: "Iniciar Sesión",
    enterDetails:
      "Ingrese su información a continuación para acceder a la información de los voluntarios.",
    tapToSignIn: "Toca para ingresar",
    inputs: {
      dniFieldLabel: "Cédula",
      dniFieldPlaceholder: "000-0000000-0",
      passwordFieldLabel: "Contraseña",
      passwordFieldPlaceholder: "Ingresa tu super contraseña secreta",
    },
  },
  registerScreen: {
    registerVolunteer: "Regístrate como voluntario",
    enterDetails:
      "Ingresa tus datos en el formulario para crear tu cuenta de voluntario.",
    tapToRegister: "Regístrate",
    inputs: {
      emailFieldLabel: "Correo electrónico",
      emailFieldPlaceholder: "Ingresa tu correo electrónico",
      firstNameFieldLabel: "Nombre",
      firstNameFieldPlaceholder: "Ingresa tu nombre",
      lastNameFieldLabel: "Apellido",
      lastNameFieldPlaceholder: "Ingresa tu apellido",
      phoneNumberFieldLabel: "Teléfono",
      phoneNumberFieldPlaceholder: "+1 (829) 000-0000",
      dniFieldLabel: "Cédula",
      dniFieldPlaceholder: "000-0000000-0",
      passwordFieldLabel: "Contraseña",
      passwordFieldPlaceholder: "Ingresa tu super contraseña secreta",
    }
  },
}

export default en
export type Translations = typeof en
