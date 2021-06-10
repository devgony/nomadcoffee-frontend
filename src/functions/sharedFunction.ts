import { seeCoffeeShops_seeCoffeeShops_coffeeShops } from "../__generated__/seeCoffeeShops";

export const getConcatenated = (
  categories: seeCoffeeShops_seeCoffeeShops_coffeeShops["categories"]
) =>
  categories?.reduce((acc, cur, i) => {
    if (i === 0) {
      return `${cur?.name}`;
    } else {
      return `${acc}, ${cur?.name}`;
    }
  }, "");
