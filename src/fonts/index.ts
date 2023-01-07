import localfont from "@next/font/local";

export const lightFont = localfont({
  src: "./FoundersGrotesk-Light.woff2",
  variable: "--font-GroteskLight",
  preload: true,
});

export const regularFont = localfont({
  src: "./FoundersGrotesk-Regular.woff2",
  variable: "--font-GroteskRegular",
  preload: true,
});

export const semiBoldFont = localfont({
  src: "./FoundersGrotesk-Semibold.woff2",
  variable: "--font-GroteskSemiBold",
  preload: true,
});

export const boldFont = localfont({
  src: "./FoundersGrotesk-Bold.woff2",
  variable: "--font-GroteskBold",
  preload: true,
});

export const condensedBoldFont = localfont({
  src: "./FoundersGroteskXCond-Bold.woff2",
  variable: "--font-GroteskXCondBold",
  preload: true,
});
