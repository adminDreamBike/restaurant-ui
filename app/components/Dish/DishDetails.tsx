"use client";

import { Suspense } from "react";
import {
  Image,
  Container,
  Text,
  IconButton,
  Editable,
  EditablePreview,
  Flex,
  UnorderedList,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import { capitalizeFirstLetter } from "../../lib/utils/utils";
import { useCartStore } from "@/app/lib/stores/cart";
import { Product, Rating as RatingType } from "@/app/lib/stores/types";
import { useProductsStore } from "@/app/lib/stores/product";

const Rating = ({ rating }: { rating: RatingType }) => {
  const { reviews = "", score = 0 } = rating || {};

  return (
    <Container
      display="flex"
      flexDirection="row"
      padding="0"
      justifyContent="flex-end"
      width="auto"
      margin="0"
      alignItems="center"
    >
      {score > 4.5 ? (
        <>
          <StarIcon color="#f2cf63" />
          <StarIcon color="#f2cf63" />
          <StarIcon color="#f2cf63" />
          <StarIcon color="#f2cf63" />
          <StarIcon color="#f2cf63" />
        </>
      ) : score > 3 ? (
        <>
          <StarIcon color="#f2cf63" /> <StarIcon color="#f2cf63" />{" "}
          <StarIcon color="#f2cf63" />
        </>
      ) : (
        <StarIcon color="#f2cf63" />
      )}
      <Text fontSize="2xl">{score}</Text>
      <Text fontSize="sm">({reviews} reviews)</Text>
    </Container>
  );
};

const Counter = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <Container display="flex" flexDirection="row" width="auto" margin="0">
      <IconButton
        backgroundColor="#ff9431"
        aria-label="button -"
        isRound={true}
        icon={<FaMinus color="white" />}
        size="sm"
        onClick={() => decreaseQuantity(product)}
      />
      <Text margin="0 14px">{product.quantity || 0}</Text>
      <IconButton
        backgroundColor="#ff9431"
        aria-label="button plus"
        isRound={true}
        icon={<FaPlus color="white" />}
        size="sm"
        onClick={() => addToCart(product)}
      />
    </Container>
  );
};

const FoodDetails = () => {
  return (
    <Editable
      width="120px"
      height="70px"
      background="white"
      rounded="15%"
      border="1px solid #ff9431"
      padding="4px 12px"
      display="flex"
    >
      <EditablePreview />
      <Flex flexDirection="column">
        <Text color="#ff922c" fontSize="12px">
          Size
        </Text>
        <Text fontSize="16px" marginTop="8px" fontWeight="600">
          554 KCal
        </Text>
      </Flex>
    </Editable>
  );
};

export const DishDetails = () => {
  const searchParams = useSearchParams();
  const idDish = Number(searchParams.get("id"));
  //   const { data = [], loading } = useFetch({
  //     url: `https://66e0bbf32fb67ac16f2a76bb.mockapi.io/products?id=${idDish}`,
  //   });

  //   const { category, image, name, price, ingredients, rating }: Product =
  //     data[0] || [];

  const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.isLoading);

  const filteredProducts = products.filter((product) => product.id === idDish);
  const { image, category, name, rating, price, ingredients } =
    filteredProducts[0];
  return (
    <Suspense>
      <Flex justifyContent="center">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Container>
            <Image
              borderRadius="full"
              alt="dish image"
              src={image}
              boxSize="250px"
              margin="40px auto"
              border="4px solid white"
              boxShadow="0 0 10px #ff922c;"
            />
            <Text
              paddingRight="1rem"
              paddingLeft="1rem"
              fontWeight="200"
              fontSize="xl"
            >
              {capitalizeFirstLetter(category)}
            </Text>
            <Container
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Text fontWeight="bold" fontSize="2xl">
                {name}
              </Text>
              <Rating rating={rating} />
            </Container>
            <Container
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginTop="20px"
            >
              <Flex fontSize="xl">
                <Text fontWeight="bold" color="#ff922c">
                  $ {price}
                </Text>
                <Text fontWeight="300" color="#ff922c">
                  .oo
                </Text>
              </Flex>
              <Counter product={filteredProducts[0]} />
            </Container>
            <Flex marginTop="32px" justifyContent="space-between">
              <FoodDetails />
              <FoodDetails />
              <FoodDetails />
            </Flex>
            <Text fontWeight="bold" marginTop="20px">
              About
            </Text>
            <UnorderedList marginTop="12px">
              {ingredients?.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </UnorderedList>
          </Container>
        )}
      </Flex>
    </Suspense>
  );
};
