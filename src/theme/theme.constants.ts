export type Obj = {
  [key: string]: string | number;
};

export type Theme = {
  colors: Obj;
  fonts: string[];
  fontSizes: Obj;
  fontWeights: Obj;
};

export const theme: Theme = {
  colors: {
    hulkGreenLight: "#007961",
    hulkGreenStandard: "#002d34",
    colaRedLight: "#761e2e",
    colaRedStandard: "#311828",
    arcticBlue: "#828fa1",
    darkBlue: "#0d1423",
    standardBlue: "#31415c",
    violent: "#5c3ae1",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    xs: "1em",
    sm: "1.2em",
    md: "1.6em",
    lg: "3em",
  },
  fontWeights: {
    light: 200,
    normal: 400,
    semiBold: 600,
    bold: 800,
  },
};
