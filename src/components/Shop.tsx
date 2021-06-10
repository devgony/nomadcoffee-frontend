import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useHistory, useLocation, useParams } from "react-router";
import styled from "styled-components";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
  seeCoffeeShops_seeCoffeeShops_coffeeShops,
} from "../__generated__/seeCoffeeShops";
import { Title } from "./shared";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import {
  deleteCoffeeShop,
  deleteCoffeeShopVariables,
} from "../__generated__/deleteCoffeeShop";
import { useState } from "react";
import CoffeeShopForm from "./CoffeeShopForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { createCoffeeShopVariables } from "../__generated__/createCoffeeShop";
import {
  editCoffeeShop,
  editCoffeeShopVariables,
} from "../__generated__/editCoffeeShop";
import { getConcatenated } from "../functions/sharedFunction";

const DELETE_COFFEE_SHOP = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

const EDIT_COFFEE_SHOP = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categoryNames: [String]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categoryNames: $categoryNames
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 5vh;
`;

const SPhoto = styled.img<{ src: string }>`
  max-width: 300px;
  height: 40vh;
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80vw;
  img {
    margin: 0 5px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80vw;
`;

const Button = styled.span`
  width: 80px;
  cursor: pointer;
`;

const Placeholder = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const EditFormContainer = styled.div``;

export default function Shop() {
  const { id, latitude, longitude, name, photos, user, categories, isMine } =
    useLocation<seeCoffeeShops_seeCoffeeShops_coffeeShops>()?.state;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      latitude,
      longitude,
      name,
      categories: getConcatenated(categories),
    },
    mode: "onChange",
  });
  const history = useHistory();
  const [editForm, setEditForm] = useState(false);
  const toggleEditForm = () => {
    // setValue("latitude", latitude);
    // setValue("longitude", longitude);
    // setValue("name", name);
    // setValue("photos", photos);
    // setValue("user", user);
    setEditForm(prev => !prev);
  };
  const onCompleted = (data: deleteCoffeeShop) => {
    if (data.deleteCoffeeShop.ok) {
      history.push("/");
    }
  };
  const [deleteCoffeeShop, { data, loading, error }] = useMutation<
    deleteCoffeeShop,
    deleteCoffeeShopVariables
  >(DELETE_COFFEE_SHOP, { onCompleted });
  const handleDelete = () => {
    const confirm = window.confirm("Are you sure to delete?");
    if (confirm) {
      deleteCoffeeShop({ variables: { id } });
    }
  };
  const onEditCompleted = (data: editCoffeeShop) => {
    if (data.editCoffeeShop.ok) {
      alert("Edited!");
      history.push("/");
    } else {
      console.log(data.editCoffeeShop.error);
    }
  };
  const [
    editCoffeeShop,
    { data: dataEdit, loading: loadingEdit, error: errorEdit },
  ] = useMutation<editCoffeeShop, editCoffeeShopVariables>(EDIT_COFFEE_SHOP, {
    onCompleted: onEditCompleted,
  });
  const onSubmitValid: SubmitHandler<
    Omit<editCoffeeShopVariables, "categoryNames" | "id"> & {
      categories: string;
    }
  > = data => {
    if (loadingEdit) {
      return;
    }
    if (data) {
      const categoryNames = data.categories.split(", ");
      editCoffeeShop({ variables: { id, ...data, categoryNames } });
    } else {
    }
  };
  return (
    <>
      <Container>
        <TopContainer>
          {isMine && <Placeholder />}
          <Title>{name}</Title>
          {isMine && (
            <Placeholder>
              <Button onClick={() => toggleEditForm()}>
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </Button>
              <Button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} size="2x" />
              </Button>
            </Placeholder>
          )}
        </TopContainer>
        <PhotoContainer>
          {photos?.map(
            (photo, i) => photo?.url && <SPhoto key={i} src={photo?.url} />
          )}
        </PhotoContainer>
        <span>
          at {latitude},{longitude}
        </span>
        <span>category: {getConcatenated(categories)}</span>
        <span>by {user.name}</span>
        {editForm && (
          <EditFormContainer>
            <CoffeeShopForm
              loading={loadingEdit}
              onSubmitValid={onSubmitValid}
              register={register}
              handleSubmit={handleSubmit}
              formState={formState}
              buttonName="Edit"
              photoRequired={false}
            />
          </EditFormContainer>
        )}
      </Container>
    </>
  );
}
