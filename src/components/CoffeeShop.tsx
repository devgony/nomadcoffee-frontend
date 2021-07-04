import { ApolloQueryResult } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getConcatenated } from "../functions/sharedFunction";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
  seeCoffeeShops_seeCoffeeShops_coffeeShops,
} from "../__generated__/seeCoffeeShops";

const Container = styled(Link)`
  /* background-color: green; */
  height: 250px;
  width: 250px;
  /* margin: 5%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SPhoto = styled.img<{ src: string }>`
  max-width: 60%;
  max-height: 60%;
`;

const SPhotoTitle = styled.h1`
  font-size: 20px;
`;

const SInfoContainer = styled.span`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default function CoffeeShop({
  id,
  latitude,
  longitude,
  name,
  photos,
  user,
  categories,
  isMine,
}: seeCoffeeShops_seeCoffeeShops_coffeeShops) {
  return (
    <Container
      to={{
        pathname: `/shop/${id}`,
        state: {
          id,
          latitude,
          longitude,
          name,
          photos,
          user,
          categories,
          isMine,
        },
      }}
    >
      <SPhotoTitle>{name}</SPhotoTitle>
      {/* {photos?.map(photo => photo?.url && <SPhoto src={photo.url} />)} */}
      {photos && photos[0] && photos[0].url && <SPhoto src={photos[0].url} />}
      <SInfoContainer>
        <span>
          at {latitude},{longitude}
        </span>
        <span>category: {getConcatenated(categories)}</span>
        <span>by {user.name}</span>
      </SInfoContainer>
    </Container>
  );
}
