import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import useBeacon from "../hooks/useBeacon";
import { Preloader } from "./Preloader";

export const ContractTransferForm: React.FC<{
  contractAddress: string;
  pkh: string;
}> = ({ contractAddress, pkh }) => {
  const { Tezos } = useBeacon();
  const [amount, setAmount] = useState("10");
  const [to, setTo] = useState("");
  const [fetching, setFetching] = useState(false);

  const handleClick = useCallback(async () => {
    setFetching(true);
    try {
      const contract = await Tezos.wallet.at(contractAddress);
      const op = await contract.methods
        .transfer(pkh, to, Number(amount))
        .send();

      await op.confirmation(1);

      alert("One confirmation has been received from the network!");
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  }, [contractAddress, pkh, amount, to, setFetching, Tezos.wallet]);

  return (
    <Box w="full">
      <Text size="sm" align="left" marginBottom="2">
        Transfer:
      </Text>
      {!fetching ? (
        <>
          <Input
            placeholder="tz1QLY8gCFzrezkqkQpHAHBRPvgtV9Z1KuML"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            marginBottom="4"
          />
          <InputGroup>
            <InputRightElement
              width="7rem"
              children={
                <Button size="sm" onClick={handleClick}>
                  Transfer
                </Button>
              }
            />
            <Input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </InputGroup>
        </>
      ) : (
        <Preloader mx="auto" d="block" />
      )}
    </Box>
  );
};
