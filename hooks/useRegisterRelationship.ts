import { useCallback, useState } from "react";
import {
  Client,
  RegisterRelationshipRequest,
  RegisterRelationshipResponse,
} from "@story-protocol/core-sdk";
import { useStoryClient } from "./useStoryClient";

export default function useRegisterRelationship(
  registerRelReq: RegisterRelationshipRequest
) {
  const { client } = useStoryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<RegisterRelationshipResponse>({
    txHash: "",
    success: undefined,
    relationshipId: undefined,
  });
  const [isError, setIsError] = useState<boolean>(false);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: RegisterRelationshipResponse = await (
        client as Client
      ).relationship.register(registerRelReq);

      console.log("HELLO", { data });
      setData(data);
      setIsLoading(false);
    } catch (e: unknown) {
      console.log("ERROR", { e });
      setIsLoading(false);
      setIsError(true);
    }
  }, [client, registerRelReq]);

  return {
    execute,
    data,
    isError,
    isLoading,
  };
}
