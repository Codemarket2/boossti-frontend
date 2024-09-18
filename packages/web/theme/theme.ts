import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, PaletteMode } from "@mui/material/styles";
import { getDesignTokens } from "./theme-primitives";
import { surfacesCustomizations } from "./customization";

export default function getBlogTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...surfacesCustomizations,
    },
  };
}
