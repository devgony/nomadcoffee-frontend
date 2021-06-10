/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops_categories {
  __typename: "Category";
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops_user {
  __typename: "User";
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string | null;
}

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops {
  __typename: "CoffeeShop";
  id: number;
  isMine: boolean;
  name: string;
  latitude: string;
  longitude: string;
  categories: (seeCoffeeShops_seeCoffeeShops_coffeeShops_categories | null)[] | null;
  user: seeCoffeeShops_seeCoffeeShops_coffeeShops_user;
  photos: (seeCoffeeShops_seeCoffeeShops_coffeeShops_photos | null)[] | null;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "Result";
  coffeeShops: (seeCoffeeShops_seeCoffeeShops_coffeeShops | null)[] | null;
  maxPage: number;
}

export interface seeCoffeeShops {
  seeCoffeeShops: seeCoffeeShops_seeCoffeeShops | null;
}

export interface seeCoffeeShopsVariables {
  page: number;
}
