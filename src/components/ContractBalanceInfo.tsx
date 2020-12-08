import { Box, Textarea, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import useBeacon from "../hooks/useBeacon";
import { usePendingPromise } from "../hooks/usePendingPromise";
import { Preloader } from "./Preloader";

export const ContractBalanceInfo: React.FC<{
  contractAddress: string;
  pkh: string;
}> = ({ contractAddress, pkh }) => {
  const { Tezos } = useBeacon();
  const fetcher = useCallback(async () => {
    const contract = await Tezos.contract.at(contractAddress);
    return contract.views
      .getBalance(pkh)
      .read()
      .catch(() => 0);
  }, [contractAddress, pkh, Tezos.contract]);

  const { fetching, data: balance, error } = usePendingPromise(fetcher);
  return !fetching && (balance || error) ? (
    <Box w="full">
      <Text size="sm" align="left" marginBottom="2">
        FA1.2 balance for your account:
      </Text>
      <Textarea readOnly defaultValue={error || balance} isInvalid={!!error} />
    </Box>
  ) : (
    <Preloader />
  );
};
