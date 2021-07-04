import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import CoffeeShop from "../components/CoffeeShop";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";

const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      coffeeShops {
        id
        isMine
        name
        latitude
        longitude
        categories {
          name
        }
        user {
          name
        }
        photos {
          url
        }
      }
      maxPage
    }
  }
`;

const PhotoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2%;
  /* background-color: lightskyblue; */
  height: 80vh;
  margin: 0 auto;
  max-width: 1000px;
`;

const SPageIndicator = styled.span`
  display: block;
  margin: 1vh auto;
  font-size: 20px;
  text-align: center;
`;

const SIcon = styled.i`
  cursor: pointer;
`;

function Home() {
  const [page, setPage] = useState(1);
  const nextPage = (max?: number) => {
    setPage(prev => (max && prev < max ? prev + 1 : prev));
  };
  const prevPage = () => {
    setPage(prev => (prev > 1 ? prev - 1 : prev));
  };
  const { loading, data, error } = useQuery<
    seeCoffeeShops,
    seeCoffeeShopsVariables
  >(SEE_COFFEE_SHOPS, {
    variables: { page },
    fetchPolicy: "no-cache",
  });
  return (
    <>
      <PhotoContainer>
        {data?.seeCoffeeShops?.coffeeShops?.map(
          coffeeShop =>
            coffeeShop && <CoffeeShop key={coffeeShop.id} {...coffeeShop} />
        )}
      </PhotoContainer>
      <SPageIndicator>
        <SIcon onClick={prevPage}>←</SIcon> page {page} /{" "}
        {data?.seeCoffeeShops?.maxPage}{" "}
        <SIcon onClick={() => nextPage(data?.seeCoffeeShops?.maxPage)}>→</SIcon>
      </SPageIndicator>
    </>
  );
}
export default Home;
