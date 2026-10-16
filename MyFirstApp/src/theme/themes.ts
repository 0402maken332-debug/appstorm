export const themes = {
  light: {
    background: '#F4F8FC', card: '#FFFFFF', text: '#102A43',
    muted: '#52677D', primary: '#0B66E4', onPrimary: '#FFFFFF',
    border: '#D7E2EF', tint: '#E8F1FF', danger: '#BA2922', dangerBg: '#FCEAEA',
  },
  dark: {
    background: '#101827', card: '#1B2638', text: '#F7FAFC',
    muted: '#B4C4D6', primary: '#20C5F5', onPrimary: '#082234',
    border: '#35455D', tint: '#203B53', danger: '#FFB4AB', dangerBg: '#44292E',
  },
};

export type AppTheme = typeof themes.light;
export const fontMultipliers = { small: 14 / 17, normal: 1, large: 21 / 17 };
export const spacing = { sm: 8, md: 16, lg: 24 };
