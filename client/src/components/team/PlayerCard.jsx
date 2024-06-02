import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

function PlayerCard({ player, isLoginUserManager, handleAssignContractClick }) {
  return (
    <Box
      maxW="800px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      // borderWidth={1}
      borderRadius="md"
      mb={3}
      p={3}
      bg="#EDF2F7"
    >
      <Box display="flex" alignItems="center" mr="3rem">
        <Avatar
          src={player.user.avatar}
          name={player.user.fullName}
          size="sm"
        />
        <Text fontSize="1rem" fontWeight="500" ml={3}>
          {player.user.fullName}
        </Text>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          colorScheme="teal"
          size="sm"
          rightIcon={<ExternalLinkIcon />}
          mr={4}
          fontWeight="400"
        >
          Profile
        </Button>
        {isLoginUserManager && (
          <>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
              >
                Options
              </MenuButton>
              <MenuList fontSize="1rem">
                <MenuItem
                  onClick={() =>
                    handleAssignContractClick({
                      playerId: player._id,
                      playerName: player.user.fullName,
                    })
                  }
                >
                  Assign Contract
                </MenuItem>
                <MenuItem>Remove This Player</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PlayerCard;
