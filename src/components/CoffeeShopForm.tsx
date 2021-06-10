import { SubmitHandler, useForm, UseFormMethods } from "react-hook-form";
import styled from "styled-components";
import { createCoffeeShopVariables } from "../__generated__/createCoffeeShop";
import Button from "./auth/Button";
import Input from "./auth/Input";

interface Props
  extends Pick<UseFormMethods, "register" | "handleSubmit" | "formState"> {
  loading: boolean;
  onSubmitValid: SubmitHandler<any>;
  buttonName: string;
  photoRequired: boolean;
}

const SForm = styled.form`
  padding-top: 5vh;
  max-width: 40%;
  margin: auto;
`;

export default function CoffeeShopForm({
  loading,
  onSubmitValid,
  register,
  handleSubmit,
  formState,
  buttonName,
  photoRequired,
}: Props) {
  return (
    <SForm onSubmit={handleSubmit(onSubmitValid)}>
      <Input
        ref={register({
          required: "CoffeeShop is required.",
          minLength: {
            value: 2,
            message: "CoffeeShop should be longer than 2 chars.",
          },
        })}
        name="name"
        type="text"
        placeholder="CoffeeShop name"
      />
      <Input
        ref={register({ required: "Latitude is required." })}
        name="latitude"
        type="text"
        placeholder="Latitude"
      />
      <Input
        ref={register({ required: "Longitude is required." })}
        name="longitude"
        type="text"
        placeholder="Longitude"
      />
      <Input
        ref={register({ required: "Categories is required." })}
        name="categories"
        type="text"
        placeholder="Categories"
      />
      <Input
        ref={register({
          required: photoRequired ? "Photos is required." : false,
        })}
        name="photos"
        type="file"
        accept="image/*"
        multiple
        placeholder="Photos"
      />
      <Button
        type="submit"
        value={loading ? "Loading..." : buttonName}
        disabled={!formState.isValid || loading}
      />
    </SForm>
  );
}
