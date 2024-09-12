import {
  Text,
  Icon,
  Button,
  MenuButton,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaFire, FaBars, FaUser } from "react-icons/fa";
import { StyledHeader } from "./Header.styled";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export const Header = () => {
  return (
    <StyledHeader>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaBars />}
          variant="outline"
          color="#ff922c"
        />
        <MenuList>
          <MenuItem command="⌘T">
            <Link as={NextLink} href="/admin">
              Admin
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <Text
        align="center"
        style={{ margin: "auto 0" }}
        fontWeight="600"
        fontSize="large"
        color="white"
      >
        <Link as={NextLink} href="/">
          <Icon as={FaFire} color="white" rounded="50%" background="#ff922c" />
          Kabeer Food
        </Link>
      </Text>
      <Button
        leftIcon={<Icon as={FaUser} />}
        variant="outline"
        value="Avatar"
      />
    </StyledHeader>
  );
};
