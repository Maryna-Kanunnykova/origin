export type SortPizzasType = {
  name: string;
  prop: "rating" | "price" | "priceAscending" | "title";
};

export type SetFiltersType = {
  sort: SortPizzasType;
  categoryId: number;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortPizzasType;
}
