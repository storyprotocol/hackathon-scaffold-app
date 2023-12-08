import { useCallback, useEffect, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import {
  Client,
  CreateIPOrgRequest,
  CreateIPOrgResponse,
} from "@story-protocol/core-sdk";
import { useStoryClient } from "./useStoryClient";

export default function useCreateIpOrg(createReq: CreateIPOrgRequest) {
  const { client } = useStoryClient();

  const [txHash, setTxHash] = useState<String | undefined>(undefined);
  const [ipOrgId, setIpOrgId] = useState<String | undefined>(undefined);

  const execute = useCallback(async () => {
    try {
      const { txHash, ipOrgId }: CreateIPOrgResponse = await (
        client as Client
      ).ipOrg.create(createReq);

      setTxHash(txHash);
    } catch (e: unknown) {
      throw Error("failed to create ip org");
    }
  }, [client, createReq]);

  return {
    execute,
    txHash,
    ipOrgId,
  };
}
