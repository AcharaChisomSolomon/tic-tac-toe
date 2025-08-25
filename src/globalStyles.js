import { css } from "@emotion/react";

export default css`
  /* outfit-500 - latin */
  @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/outfit-v14-latin-500.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
  }
  /* outfit-800 - latin */
  @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 800;
    src: url('/fonts/outfit-v14-latin-800.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
  }

  :root {
    /* COLORS */
    --blue-500: hsl(178, 60%, 48%);
    --blue-300: hsl(178, 75%, 65%);
    --yellow-500: hsl(39, 88%, 58%);
    --yellow-300: hsl(39, 100%, 69%);
    --gray-500: hsl(202, 32%, 15%);
    --gray-300: hsl(199, 35%, 19%);
    --silver-500: hsl(198, 23%, 72%);
    --silver-300: hsl(197, 33%, 89%);
    --silver-btn-bg-hov: rgba(168, 191, 201, 0.05);

    /* FONT SIZES */
    --fs-40: calc(40 / 16 * 1rem);
    --fs-24: calc(24 / 16 * 1rem);
    --fs-20: calc(20 / 16 * 1rem);
    --fs-16: calc(16 / 16 * 1rem);
    --fs-14: calc(14 / 16 * 1rem);

    /* FONT WEIGHTS */
    --fw-bold: 800;
    --fw-medium: 500;


  }

  /* 1. Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin */
  * {
    margin: 0;
  }

  /* 3. Enable keyword animations */
  @media (prefers-reduced-motion: no-preference) {
    html {
      interpolate-size: allow-keywords;
    }
  }

  body {
    min-height: 100vh;
    /* display: grid;
    place-content: center; */
    background-color: var(--gray-500);
    font-family: "Outfit", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: var(--fw-medium);

    /* 4. Add accessible line-height */
    /* line-height: 1.5; */
    /* 5. Improve text rendering */
    -webkit-font-smoothing: antialiased;
  }

  /* 6. Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* 7. Inherit fonts for form controls */
  input, button, textarea, select {
    font: inherit;
  }

  /* 8. Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* 9. Improve line wrapping */
  p {
    text-wrap: pretty;
  }
  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  /*
    10. Create a root stacking context
  */
  #root, #__next {
    isolation: isolate;
  }
`;