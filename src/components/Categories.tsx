import React from "react";

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (i: number) => void;
};

const arrCategories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  setCategoryId,
}) => {
  const onClicCategor = (i: number) => {
    if (categoryId === i) return;
    setCategoryId(i);
  };

  const categoriesList = () => {
    return arrCategories.map((item, i) => (
      <li
        onClick={() => onClicCategor(i)}
        className={categoryId === i ? "active" : ""}
        key={i}
      >
        {item}
      </li>
    ));
  };

  return (
    <div className="categories">
      <ul>{categoriesList()}</ul>
    </div>
  );
};

export default Categories;
