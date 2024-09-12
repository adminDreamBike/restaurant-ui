import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { FaRectangleList } from "react-icons/fa6";
import { Image } from "@chakra-ui/react";

export const Search = ({
  onSearchProuct,
  valueInput,
}: {
  onSearchProuct: (value: string) => void;
  valueInput: string;
}) => {
  return (
    <Flex flexDirection="column" padding="0px 40px">
      <InputGroup width="lg">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Find What you Want"
          _placeholder={{ color: "black" }}
          backgroundColor="#FF922C"
          onChange={(event) => onSearchProuct(event.target.value)}
          value={valueInput}
        />
        <InputRightElement pointerEvents="none">
          <Icon as={FaRectangleList} />
        </InputRightElement>
      </InputGroup>
      <Image
        src="https://st2.depositphotos.com/3300441/11588/i/950/depositphotos_115883728-stock-photo-chinese-food-blank-background.jpg"
        alt="recipe image"
        boxSize="sm"
        rounded="5%"
        height="250px"
        width="100%"
      />
    </Flex>
  );
};
