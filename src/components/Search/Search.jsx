import { useCallback, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SearchContext } from "../../App";
import { setSearchValue } from "../../redux/slices/filterSlice";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 750),
    []
  );

  const onChangeInput = (e) => {
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
