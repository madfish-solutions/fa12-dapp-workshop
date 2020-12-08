import { useCallback, useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";

import { TezosToolkit } from "@taquito/taquito";
import { NetworkType, PermissionScope } from "@airgap/beacon-sdk";

const options = {
  name: "FA1.2 interaction dApp",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  eventHandlers: {
    PERMISSION_REQUEST_SUCCESS: {
      handler: async (data: any) => {
        console.log("permission data", data);
      },
    },
  },
};

class LambdaViewSigner {
  async publicKeyHash() {
    return "tz1fVQangAfb9J1hRRMP2bSB6LvASD6KpY8A";
  }

  async publicKey() {
    return "edpkvWbk81uh1DEvdWKR4g1bjyTGhdu1mDvznPUFE2zDwNsLXrEb9K";
  }

  async secretKey(): Promise<string> {
    throw new Error("Secret key cannot be exposed");
  }

  async sign(): Promise<{
    bytes: string;
    sig: string;
    prefixSig: string;
    sbytes: string;
  }> {
    throw new Error("Cannot sign");
  }
}

const Tezos = new TezosToolkit("https://delphinet-tezos.giganode.io");
const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);
Tezos.setSignerProvider(new LambdaViewSigner());

export default function useBeacon() {
  const [pkh, setUserPkh] = useState<string>();

  const connect = useCallback(async () => {
    await wallet.requestPermissions({
      network: { type: NetworkType.DELPHINET },
      scopes: [
        PermissionScope.OPERATION_REQUEST,
        PermissionScope.SIGN,
        PermissionScope.THRESHOLD,
      ],
    });

    setUserPkh(await wallet.getPKH());
  }, []);

  return { connect, pkh, Tezos };
}
