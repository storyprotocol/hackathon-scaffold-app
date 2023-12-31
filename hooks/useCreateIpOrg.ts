import { useCallback, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import {
  Client,
  CreateIPOrgRequest,
  CreateIPOrgResponse,
} from "@story-protocol/core-sdk";
import { useStoryClient } from "./useStoryClient";

export default function useCreateIpOrg(createReq: CreateIPOrgRequest) {
  const { client } = useStoryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<CreateIPOrgResponse>({
    txHash: "",
    ipOrgId: undefined,
  });
  const [isError, setIsError] = useState<boolean>(false);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: CreateIPOrgResponse = await (client as Client).ipOrg.create(
        createReq
      );
      setData(data);
      setIsLoading(false);
    } catch (e: unknown) {
      setIsLoading(false);
      setIsError(true);
      throw Error("failed to create ip org");
    }
  }, [client, createReq]);

  return {
    execute,
    data,
    isError,
    isLoading,
  };
}
