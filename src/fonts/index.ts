import localfont from "@next/font/local";

export const lightFont = localfont({
  src: "./FoundersGrotesk-Light.woff2",
  variable: "--font-GroteskLight",
});

export const regularFont = localfont({
  src: "./FoundersGrotesk-Regular.woff2",
  variable: "--font-GroteskRegular",
});

export const semiBoldFont = localfont({
  src: "./FoundersGrotesk-Semibold.woff2",
  variable: "--font-GroteskSemiBold",
});

export const boldFont = localfont({
  src: "./FoundersGrotesk-Bold.woff2",
  variable: "--font-GroteskBold",
});

export const condensedBoldFont = localfont({
  src: "./FoundersGroteskXCond-Bold.woff2",
  variable: "--font-GroteskXCondBold",
});
