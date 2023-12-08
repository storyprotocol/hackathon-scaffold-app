import React from "react";
import useCreateIpOrg from "@/hooks/useCreateIpOrg";
import { useAccount } from "wagmi";

export default function CreateIPOBtn() {
  const { address } = useAccount();
  const { execute, txHash, ipOrgId } = useCreateIpOrg({
    name: "DUMMY_IPO",
    symbol: "IPO",
    owner: address,
    ipAssetTypes: ["IP_ASSET_TYPE_1", "IP_ASSET_TYPE_2"],
  });

  console.log({
    txHash,
    ipOrgId,
  });

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={execute}
      >
        Create dummy IPO
      </button>
      <div>{txHash}</div>
      <div>{ipOrgId}</div>
    </>
  );
}
