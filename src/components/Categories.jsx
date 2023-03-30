const Categories = ({ categoryId, setCategoryId }) => {
  const onClicCategor = (i) => {
    if (categoryId === i) return;
    setCategoryId(i);
  };

  const arrCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
