export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type PizzaType = {
  id: string;
  title: string;
  types: number[];
  imageUrl: string;
  price: number;
  sizes: number[];
};

export interface PizzaSliceState {
  items: PizzaType[];
  status: Status;
}

export type SearchPizzaParams = {
  sort: string;
  order: string;
  categoryParams: string;
};

export type SearchPizzaParamsType = {
  sortType: string;
  order: string;
  categoryParams: string;
};
