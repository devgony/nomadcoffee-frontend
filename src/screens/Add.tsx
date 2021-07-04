import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import CoffeeShopForm from "../components/CoffeeShopForm";
import { Title } from "../components/shared";
import { COFFEE_SHOP_FRAGMENT } from "../fragments";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";

const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ...CoffeeShopFragment
    }
  }
  ${COFFEE_SHOP_FRAGMENT}
`;

const Container = styled.div`
  display: flex;
  margin-top: 10vh;
  flex-direction: column;
  align-items: center;
  /* max-width: 60%; */
`;

export default function Add() {
  const history = useHistory();
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data: createCoffeeShop) => {
    if (data.createCoffeeShop?.id) {
      history.push("/");
    }
  };
  const [createCoffeeShop, { loading, error }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATE_COFFEE_SHOP, {
    onCompleted,
  });
  // console.log(watch("photos"), error);
  const onSubmitValid: SubmitHandler<createCoffeeShopVariables> = data => {
    if (loading) {
      return;
    }
    if (data) {
      const { name, latitude, longitude, photos, categories } = getValues();
      console.log(photos);
      createCoffeeShop({
        variables: {
          name,
          latitude,
          longitude,
          photos,
          categories,
        },
      });
    }
  };
  return (
    <Container>
      <Title>Enroll your new Coffee Shop</Title>
      <CoffeeShopForm
        loading={loading}
        onSubmitValid={onSubmitValid}
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        buttonName="Enroll"
        photoRequired={true}
      />
    </Container>
  );
}
