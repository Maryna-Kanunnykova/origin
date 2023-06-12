import React from "react";
import { Helmet } from "react-helmet";

import styles from "./NotFound.module.scss";

export const NotFound: React.FC = () => {
  return (
    <div>
      <Helmet title="Not found" />
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        Страница не найдена.
      </h1>
    </div>
  );
};
