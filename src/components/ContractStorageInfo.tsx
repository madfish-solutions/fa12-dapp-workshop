import React, { useCallback } from "react";
import { Box, Textarea, Text } from "@chakra-ui/react";
import useBeacon from "../hooks/useBeacon";
import { usePendingPromise } from "../hooks/usePendingPromise";
import { Preloader } from "./Preloader";

export const ContractStorageInfo: React.FC<{ contractAddress: string }> = ({
  contractAddress,
}) => {
  const { Tezos } = useBeacon();

  const fetcher = useCallback(
    async () => (await Tezos.contract.at(contractAddress)).storage(),
    [Tezos.contract, contractAddress]
  );

  const { fetching, data: storage, error } = usePendingPromise(
    fetcher,
    JSON.stringify
  );

  return !fetching && (storage || error) ? (
    <Box w="full">
      <Text size="sm" align="left" marginBottom="2">
        Contract storage:
      </Text>
      <Textarea readOnly defaultValue={error || storage} isInvalid={!!error} />
    </Box>
  ) : (
    <Preloader />
  );
};
