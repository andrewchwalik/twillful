import React from "react";
import images from "./images.json";

export function CardImage({ src, hero = false, ...props }) {
  const versions = images[src];
  return <img {...props} src={versions?.[hero ? versions.length - 1 : 0].src || src}
    srcSet={versions?.map(image => `${image.src} ${image.width}w`).join(", ")}
    sizes={hero ? "(max-width: 639px) calc(24.5vw - 19px), (max-width: 879px) calc(24.5vw - 31px), 184px" : "76px"}
    width="500" height="500" decoding="async" loading={hero ? "eager" : "lazy"} />;
}
