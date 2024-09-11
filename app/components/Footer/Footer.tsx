import { IconButton, Flex, Badge } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { StyledFooter } from "./Footer.styled";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useCartStore } from "@/app/lib/stores/cart";

export const Footer = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  return (
    <StyledFooter>
      <Link as={NextLink} href="/shoppingcart" marginBottom="10px">
        <Flex position="relative">
          <IconButton
            icon={<FaShoppingBag />}
            aria-label="shopping-bag button"
            isRound={true}
            variant="solid"
            colorScheme="teal"
            fontSize="20px"
          />
          {totalItems > 0 && (
            <Badge
              colorScheme="red"
              size="5px"
              variant="solid"
              backgroundColor="red"
              position="absolute"
              padding="3px"
              bottom="0"
              borderRadius="50%"
              right="0"
            />
          )}
        </Flex>
      </Link>
    </StyledFooter>
  );
};
