import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: 'yellow',
  colors: {
    orange: [
      '#fb9845',
      '#845424',
      '#442c14',
      '#5c3c1c',
      '#fcad6a',
      '#5e5751',
      // "#fcb77d",
      '#fdc18f',
      '#fdcca2',
      '#fdd6b5',
      '#fee0c7',
    ],
    dark: [
      '#0c040c',
      '#0c0404',
      '#040c04',
      '#040404',
      '#080404',
      '#190f07',
      '#321e0e',
      '#4b2e15',
      '#643d1c',
      '#000000',
    ],
    white: [
      '#ffffff',
      '#e6e6e6',
      '#cccccc',
      '#b3b3b3',
      '#999999',
      '#808080',
      '#666666',
      '#4c4c4c',
      '#333333',
      '#191919',
    ],
  },
  // fontSizes: {
  //   xs: rem(10),
  //   sm: rem(14),
  //   md: rem(18),
  //   lg: rem(36),
  //   xl: rem(48),
  // },
  fontSizes: {
    xs: rem(16),
    sm: rem(20),
    md: rem(28),
    lg: rem(32),
    xl: rem(48),
  },
  spacing: {
    xs: rem(8),
    sm: rem(16),
    md: rem(20),
    lg: rem(28),
    xl: rem(32),
  },
  lineHeights: {
    xs: rem(24),
    sm: rem(28),
    md: rem(32),
    lg: rem(40),
    xl: rem(48),
  },
  // lineHeights: {
  //   xs: '.5',
  //   sm: '1.25',
  //   md: '1.45',
  //   lg: '1',
  //   xl: '1',
  // },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)', // Subtle shadow for small elements
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)', // Slightly stronger for inputs/cards
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)', // Mid-level shadow, used for modals
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)', // Prominent shadow for larger elements
    xl: '0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.05)', // Deep shadow for emphasis
  },
  fontFamily: 'Sofia Sans Extra Condensed',
  headings: {
    fontFamily: 'Sofia Sans Extra Condensed',
    fontWeight: '400',
    sizes: {
      h1: {
        fontSize: '2.25rem', // 36px
        fontWeight: '700', // Bold
        lineHeight: '2.5rem', // 40px
      },
      h2: {
        fontSize: '1.875rem', // 30px
        fontWeight: '700',
        lineHeight: '2.25rem', // 36px
      },
      h3: {
        fontSize: '1.5rem', // 24px
        fontWeight: '600', // Semi-Bold
        lineHeight: '2rem', // 32px
      },
      h4: {
        fontSize: '1.25rem', // 20px
        fontWeight: '600',
        lineHeight: '1.75rem', // 28px
      },
      h5: {
        fontSize: '1rem', // 16px
        fontWeight: '500', // Medium
        lineHeight: '1.5rem', // 24px
      },
      h6: {
        fontSize: '0.875rem', // 14px
        fontWeight: '500',
        lineHeight: '1.25rem', // 20px
      },
    },
  },
});
