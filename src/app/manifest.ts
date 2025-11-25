import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PharmaWise-AMR",
    short_name: "PharmaWise",
    description: "Decision-support & edukasi antibiotik untuk farmasis dan publik.",
    start_url: "/",
    display: "standalone",
    background_color: "#030711",
    theme_color: "#030711",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  };
}







