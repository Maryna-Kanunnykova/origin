import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import qs from "qs";

import Categories from "../components/Categories";
import PizzaBlock from "../components/Pizza/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import { setSliceCategoryId, setFilters } from "../redux/filter/slice";
import { PizzaType, Status } from "../redux/pizza/types";
import { fetchPizzas } from "../redux/pizza/asyncAction";
import { RootState, useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const sortType = useSelector((state: RootState) => state.filter.sort.prop);
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setSliceCategoryId(id));
  }, []);

  const getPizzas = async () => {
    let sort = `&sortBy=${sortType}`;
    let order = `&order=desc`;
    let categoryParams = "";

    if (categoryId > 0) {
      categoryParams = `&category=${categoryId}`;
    }

    if (sortType === "title") {
      order = `&order=asc`;
    }

    if (sortType === "priceAscending") {
      sort = `&sortBy=price`;
      order = `&order=asc`;
    }

    dispatch(
      fetchPizzas({
        sort,
        order,
        categoryParams,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params: any = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.prop === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue]);

  const pizzas = items
    .filter((obj: PizzaType) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h2>Извините, произошла ошибка😕</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === Status.LOADING
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
      )}
    </div>
  );
};
