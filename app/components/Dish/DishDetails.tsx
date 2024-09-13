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
  Button,
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

const FoodDetails = ({
  type,
  value,
}: {
  type: string;
  value: string;
}) => {
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
          {type}
        </Text>
        <Text fontSize="16px" marginTop="8px" fontWeight="600">
          {value}
        </Text>
      </Flex>
    </Editable>
  );
};

export const DishDetails = () => {
  const searchParams = useSearchParams();
  const idDish = Number(searchParams.get("id"));

  const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.isLoading);
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts = products.filter((product) => product.id === idDish);
  const {
    image = "",
    category,
    name,
    rating,
    price,
    ingredients,
  } = filteredProducts[0] || {};
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
            <Text fontWeight="200" fontSize="xl">
              {capitalizeFirstLetter(category)}
            </Text>
            <Container
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              padding="0"
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
              padding="0"
            >
              <Flex fontSize="xl">
                <Text fontWeight="bold" color="#ff922c">
                  $ {price}
                </Text>
                <Text fontWeight="300" color="#ff922c">
                  .oo
                </Text>
              </Flex>
              <Button
                backgroundColor="#ff922c"
                width="200px"
                onClick={() => addToCart(filteredProducts[0])}
              >
                Add to Cart
              </Button>
            </Container>
            <Flex marginTop="32px" justifyContent="space-between">
              <FoodDetails type='Size' value='Medium' />
              <FoodDetails type='Energy' value='554 KCal' />
              <FoodDetails type='Delivery' value='45 min' />
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
