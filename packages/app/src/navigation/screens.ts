export enum Screen {
  Home = 'Home',
}

export enum OnboardingScreen {
  Backup = 'OnboardingBackup',
  Landing = 'OnboardingLanding',
  Outro = 'OnboardingOutro',
  Security = 'OnboardingSecurity',
}

export type AppScreen = Screen | OnboardingScreen
