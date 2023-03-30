import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="13" y="269" rx="0" ry="0" width="236" height="26" />
    <rect x="11" y="319" rx="0" ry="0" width="238" height="70" />
    <rect x="15" y="419" rx="0" ry="0" width="84" height="34" />
    <rect x="123" y="413" rx="0" ry="0" width="125" height="45" />
  </ContentLoader>
);

export default Skeleton;
