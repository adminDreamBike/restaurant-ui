import {
  Card,
  Image,
  Flex,
  Text,
  Container,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useCartStore } from "@/app/lib/stores/cart";
import { Product } from "@/app/lib/stores/types";

export const DishList = ({products}: {products: Product[]}) => {
  const categories = [
    {
      id: 1,
      name: "breakfast",
    },
    {
      id: 2,
      name: "lunch",
    },
    {
      id: 3,
      name: "dinner",
    },
  ];

//   const { data = [], loading } = useFetch({
//     url: "https://66e0bbf32fb67ac16f2a76bb.mockapi.io/products",
//   });

  const DishImages = ({ products }: {products: Product[]}) => {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
      <>
        {products?.map((dish) => (
          <Container key={dish.id}>
            <Link
              as={NextLink}
              href={`/dishes?id=${dish.id}`}
              marginBottom="10px"
            >
              <Image
                rounded="full"
                src={dish.image}
                alt={dish.name}
                boxSize="80px"
                border="2px solid white"
                boxShadow="0 0 10px #ff922c;"
              />
            </Link>
            <Tooltip label="Add dish">
              <IconButton
                icon={<AddIcon boxSize={3} />}
                aria-label="add dish"
                size="xs"
                variant="outline"
                isRound={true}
                colorScheme="#ff922c"
                onClick={() => addToCart(dish)}
              />
            </Tooltip>
          </Container>
        ))}
      </>
    );
  };

  return (
    <Flex flexDirection="row" gap="40px">
      {categories?.map((category) => {
        return (
          <Flex key={category.id} flexDirection="column" align="center" >
            <Text fontWeight="bold" marginBottom="12px" >
              {category.name}
            </Text>
            <Card
              display="flex"
              flexDirection="column"
              backgroundColor="white"
              padding="20px 10px"
              rounded="5%"
            >
              <DishImages
                products={products?.filter(
                  (product: Product) => product.category === category.name
                )}
              />
            </Card>
          </Flex>
        );
      })}
    </Flex>
  );
};
