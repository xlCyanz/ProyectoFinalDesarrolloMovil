const en = {
  MainNavigator: {
    homeScreen: {
      tabBarTitle: "Inicio"
    },
    aboutScreen: {
      tabBarTitle: "Acerca de"
    },
    volunteeringScreen: {
      tabBarTitle: "Voluntariado",
      welcomeVolunteers: "Bienvenidos voluntarios",
      newsListTitle: "Lista de noticias relevantes",
      emptyStateTitle: "No hay noticias relevantes disponibles.",
      emptyStateSubtitle: "Toca en intentar de nuevo para refrescar",
    },
    newsScreen: {
      title: "Noticias",
      newsListTitle: "Lista de noticias",
      emptyStateTitle: "No hay noticias disponibles.",
    },
    membersScreen: {
      title: "Miembros de la defensa civil",
      emptyStateTitle: "No hay miembros disponibles.",
      emptyStateSubtitle: "Toca en intentar de nuevo para refrescar",
    },
    hostelsScreen: {
      title: "Albergues disponibles",
      emptyStateTitle: "No hay albergues disponibles.",
      emptyStateSubtitle: "Toca en intentar de nuevo para refrescar",
    },
    signInScreen: {
      tabBarTitle: "Iniciar Sesión",
      enterDetails:
        "Ingrese su información a continuación para acceder a la información de los voluntarios.",
      tapToSignIn: "Toca para ingresar",
      signUpText: "¿No te has registrado?",
      tapToSignUp: "Ir a registrarse",
      inputs: {
        dniFieldLabel: "Cédula",
        dniFieldPlaceholder: "000-0000000-0",
        passwordFieldLabel: "Contraseña",
        passwordFieldPlaceholder: "Ingresa tu super contraseña secreta",
      },
    },
    changePasswordScreen: {
      tabBarTitle: "Cambiar contraseña",
      subtitle:
        "Ingrese la antigua y nueva contraseña para actualizar.",
      tapToChange: "Toca para cambiar",
      inputs: {
        oldPasswordFieldLabel: "Antigua contraseña",
        oldPasswordFieldPlaceholder: "Ingresa tu antigua contraseña secreta",
        newPasswordFieldLabel: "Nueva contraseña",
        newPasswordFieldPlaceholder: "Ingresa tu super nueva contraseña secreta",
      },
    },
  },
  historyScreen: {
    tabBarTitle: "Historia de la defensa civil"
  },
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    emptyStateTryTap: "Intentar de nuevo",
    emptyStateTryAgain: "Toca en intentar de nuevo para refrescar",
  },
  welcomeScreen: {
    title: "Proyecto Final de Intr. Desarrollo Movil",
    subtitle: "Aplicación para la Defensa Civil",
    access: "Acceder a la aplicación"
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
