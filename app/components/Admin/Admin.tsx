import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
  Input
} from "@chakra-ui/react";

export const Admin = () => {
  return (
    <Container>
      <FormControl>
        <FormLabel>Name Dish</FormLabel>
        <Input type="text" />
        <FormLabel>Price</FormLabel>
        <Input type="text" />
        <FormLabel>Ingredients</FormLabel>
        <Input type="text" />
        <FormLabel>Score</FormLabel>
        <Input type="text" />
        <FormLabel>Reviews</FormLabel>
        <Input type="text" />
      </FormControl>
    </Container>
  );
};
