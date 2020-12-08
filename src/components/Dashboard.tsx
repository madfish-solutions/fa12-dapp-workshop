import React from "react";
import { Button, VStack } from "@chakra-ui/react";

export function Dashboard() {
  return (
    <VStack spacing="6" alignItems="flex-start">
      <Button colorScheme="teal" variant="outline">
        Connect wallet
      </Button>
    </VStack>
  );
}
