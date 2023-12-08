import React from "react";
import useCreateIpOrg from "@/hooks/useCreateIpOrg";
import { useAccount } from "wagmi";
import useCreateIPAsset from "@/hooks/useCreateIPA";
import JsonView from "@uiw/react-json-view";
import useRegisterRelationshipType from "@/hooks/useRegisterRelationshipType";
import useRegisterRelationship from "@/hooks/useRegisterRelationship";

export default function CreateIPOBtn() {
  const { address, isConnected } = useAccount();

  const mockCreateIPOrgReq = {
    name: "DUMMY_IPO",
    symbol: "IPO",
    owner: address,
    ipAssetTypes: ["IP_ASSET_TYPE_1", "IP_ASSET_TYPE_2"],
    txOptions: {
      waitForTransaction: true,
    },
  };

  const {
    execute: createIPOrg,
    data: IPOrgData,
    isError: isCreateIPOrgError,
    isLoading: isCreateIPOrgLoading,
  } = useCreateIpOrg(mockCreateIPOrgReq);

  const {
    execute: createIPAsset,
    data: IPAssetData,
    isError: isCreateIPAssetError,
    isLoading: isCreateIPAssetLoading,
  } = useCreateIPAsset({
    name: "DUMMY_IP_ASSET",
    typeIndex: 0,
    ipOrgId: IPOrgData?.ipOrgId as string,
    owner: address,
    mediaUrl: "https://ipfs.io",
    txOptions: { waitForTransaction: true },
  });

  const {
    execute: registerRelationshipType,
    data: RelationshipTypeData,
    isError: isRegisterRelationshipTypeError,
    isLoading: isRegisterRelationshipTypeLoading,
  } = useRegisterRelationshipType({
    ipOrgId: IPOrgData?.ipOrgId as string,
    relType: "DUMMY_REL_TYPE_1",
    relatedElements: { src: 1, dst: 1 },
    allowedSrcIpAssetTypes: [0],
    allowedDstIpAssetTypes: [0],
  });

  const {
    execute: registerRelationship,
    data: RelationshipData,
    isError: isRegisterRelationshipError,
    isLoading: isRegisterRelationshipLoading,
  } = useRegisterRelationship({
    ipOrgId: IPOrgData?.ipOrgId as string,
    relType: "DUMMY_REL_TYPE_1",
    srcContract: process.env.NEXT_PUBLIC_IP_ASSET_REGISTRY_CONTRACT as string,
    srcTokenId: IPAssetData?.ipAssetId as string,
    dstContract: process.env.NEXT_PUBLIC_IP_ASSET_REGISTRY_CONTRACT as string,
    dstTokenId: "0",
  });

  return !isConnected && !address ? (
    "Connect Your Wallet To Get Started"
  ) : (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => createIPOrg()}
        disabled={!isConnected && !address}
      >
        {isCreateIPOrgLoading ? "Tx Processing..." : "Create IPO"}
      </button>

      {IPOrgData.ipOrgId && (
        <>
          <div className="flex flex-row">
            <div>
              <h2>Create IPOrg Request</h2>
              {IPOrgData && <JsonView value={mockCreateIPOrgReq} />}
            </div>
            <div>
              <h2>Create IPOrg Response</h2>
              {IPOrgData && <JsonView value={IPOrgData} />}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            {/* Create IPA */}
            <div className="flex flex-col gap-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => createIPAsset()}
                disabled={!isConnected && !address && !IPOrgData}
              >
                {isCreateIPAssetLoading ? "Tx Processing..." : "Create IPAsset"}
              </button>
              {IPAssetData.ipAssetId && (
                <div className="">
                  <h2>Create IPAsset Result</h2>
                  {IPAssetData && <JsonView value={IPAssetData} />}
                </div>
              )}
            </div>
            {/* Register Relationship Type */}
            <div className="flex flex-col gap-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => registerRelationshipType()}
                disabled={!isConnected && !address && !IPOrgData.ipOrgId}
              >
                {isRegisterRelationshipTypeLoading
                  ? "Tx Processing..."
                  : "Register Relationship Type "}
              </button>
              {RelationshipTypeData && (
                <div className="">
                  <h2>Register RelationshipType Result</h2>
                  {RelationshipTypeData && (
                    <JsonView value={RelationshipTypeData} />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {IPAssetData.ipAssetId && (
        <div className="flex flex-row justify-between gap-10">
          {/* Create IPA */}
          <div className="flex flex-col gap-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => registerRelationship()}
              disabled={!isConnected && !address && !IPAssetData.ipAssetId}
            >
              {isRegisterRelationshipLoading
                ? "Tx Processing..."
                : "Register Relationship"}
            </button>
            {RelationshipData && (
              <div className="">
                <h2>Register Relationship Result</h2>
                {RelationshipData && <JsonView value={RelationshipData} />}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
