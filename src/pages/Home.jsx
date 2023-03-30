import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import qs from "qs";

import Categories from "../components/Categories";
import PizzaBlock from "../components/Pizza/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pagination from "../Pagination/Pagination";
import { list } from "../components/Sort";
import {
  setSliceCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

export const Home = () => {
  // (пагинация) const currentPage = useSelector((state) => state.filter.currentPage);
  const sortType = useSelector((state) => state.filter.sort.prop);
  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, searchValue } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setSliceCategoryId(id));
  };

  // (пагинация) const onChangePage = (number) => {
  //   dispatch(setCurrentPage(number));
  // };

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
      const params = qs.parse(window.location.search.substring(1));
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
  }, [
    categoryId,
    sortType,
    // (пагинация)currentPage,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [
    categoryId,
    sortType,
    searchValue,
    // (пагинация)currentPage,
  ]);

  const pizzas = items
    .filter((obj) => {
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Извините, произошла ошибка😕</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
      )}
      {/* (пагинация)  <Pagination currentPage={currentPage} onChangePage={onChangePage} />*/}
    </div>
  );
};
