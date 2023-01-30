import localfont from "@next/font/local";

export const lightFont = localfont({
  src: "./FoundersGrotesk-Light.woff2",
  variable: "--font-GroteskLight",
  display: "swap",
  preload: true,
});

export const regularFont = localfont({
  src: "./FoundersGrotesk-Regular.woff2",
  variable: "--font-GroteskRegular",
  display: "swap",
  preload: true,
});

export const semiBoldFont = localfont({
  src: "./FoundersGrotesk-Semibold.woff2",
  variable: "--font-GroteskSemiBold",
  display: "swap",
  preload: true,
});

export const boldFont = localfont({
  src: "./FoundersGrotesk-Bold.woff2",
  variable: "--font-GroteskBold",
  display: "swap",
  preload: true,
});

export const condensedBoldFont = localfont({
  src: "./FoundersGroteskXCond-Bold.woff2",
  variable: "--font-GroteskXCondBold",
  display: "swap",
  preload: true,
});
