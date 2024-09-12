"use client";

import { useCartStore } from "@/app/lib/stores/cart";
import { Card, Image, IconButton, Text, Flex, Tooltip } from "@chakra-ui/react";
import { DeleteIcon, MinusIcon, AddIcon } from "@chakra-ui/icons";
import { Product } from "@/app/lib/stores/types";

export const CartItem = ({
  product,
  onRemoveProduct,
}: {
  product: Product;
  onRemoveProduct: (product: Product) => void;
}) => {
  const { title, description, price, image, quantity } = product;
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  return (
    <Card
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap="0 12px"
      padding="8px 8px 8px 8px"
    >
      <Image alt="image product" src={image} width="100px" height="100px" />
      <Flex flexDirection="column" flexGrow="1">
        <Text fontWeight="bold" fontSize="xl">
          {title}
        </Text>
        <Text>{description}</Text>
        <Flex flexDirection="row" flexGrow="1" alignItems="center">
          <IconButton
            icon={<MinusIcon color="black" />}
            aria-label="decrease item"
            variant="outline"
            size="xs"
            isRound={true}
            colorScheme="#ff922c"
            color="#ff922c"
            onClick={() => decreaseQuantity(product.id)}
          />
          <Text margin="0 12px">{quantity}</Text>
          <IconButton
            icon={<AddIcon color="black" />}
            aria-label="increase item"
            variant="outline"
            size="xs"
            isRound={true}
            colorScheme="#ff922c"
            color="#ff922c"
            onClick={() => increaseQuantity(product.id)}
          />
        </Flex>
      </Flex>

      <Flex flexDirection="column" justifyContent="space-between">
        <Tooltip label="remove product">
          <IconButton
            icon={<DeleteIcon />}
            aria-label="remove item"
            onClick={() => onRemoveProduct(product)}
            backgroundColor="transparent"
          />
        </Tooltip>
        <Text fontWeight="bold">${price}</Text>
      </Flex>
    </Card>
  );
};
