import React from "react";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/filter/slice";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 750),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src="img/Search.png" alt="Search" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пицц..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.clearIcon}
          src="img/Close.png"
          alt="Close"
        />
      )}
    </div>
  );
};

export default Search;
