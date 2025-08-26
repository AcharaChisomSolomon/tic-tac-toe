export const BREAKPOINTS = {
  phone: 550,
  tablet: 1100,
  laptop: 1500,
};

export const QUERIES = {
  tabletAndLarger: `(min-width: ${BREAKPOINTS.phone / 16}rem)`,
  laptopAndLarger: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`,
  desktopAndLarger: `(min-width: ${BREAKPOINTS.laptop / 16}rem)`,
};

export const SCORE_TAGS = {
  true: {
    starter: 'YOU',
    other: 'CPU'
  },
  false: {
    starter: 'P1',
    other: 'P2'
  }
}