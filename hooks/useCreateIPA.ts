import { useCallback, useState } from "react";
import {
  Client,
  CreateIpAssetRequest,
  CreateIpAssetResponse,
} from "@story-protocol/core-sdk";
import { useStoryClient } from "./useStoryClient";

export default function useCreateIPAsset(createReq: CreateIpAssetRequest) {
  const { client } = useStoryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<CreateIpAssetResponse>({
    txHash: "",
    ipAssetId: undefined,
  });
  const [isError, setIsError] = useState<boolean>(false);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: CreateIpAssetResponse = await (
        client as Client
      ).ipAsset.create(createReq);
      setData(data);
      setIsLoading(false);
    } catch (e: unknown) {
      setIsLoading(false);
      setIsError(true);
      throw Error("failed to create ip ipasset");
    }
  }, [client, createReq]);

  return {
    execute,
    data,
    isError,
    isLoading,
  };
}
