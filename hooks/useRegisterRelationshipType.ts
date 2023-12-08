import { useCallback, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import {
  Client,
  RegisterRelationshipTypeResponse,
  RegisterRelationshipTypeRequest,
} from "@story-protocol/core-sdk";
import { useStoryClient } from "./useStoryClient";

export default function useRegisterRelationshipType(
  registerTypeReq: RegisterRelationshipTypeRequest
) {
  const { client } = useStoryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<RegisterRelationshipTypeResponse>({
    txHash: "",
    success: undefined,
    relationshipId: undefined,
  });
  const [isError, setIsError] = useState<boolean>(false);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: RegisterRelationshipTypeResponse = await (
        client as Client
      ).relationshipType.register(registerTypeReq);

      console.log("HELLO", { data });
      setData(data);
      setIsLoading(false);
    } catch (e: unknown) {
      console.log("ERROR", { e });
      setIsLoading(false);
      setIsError(true);
    }
  }, [client, registerTypeReq]);

  return {
    execute,
    data,
    isError,
    isLoading,
  };
}
