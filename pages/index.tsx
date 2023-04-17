import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";

import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import NFTCard from "../components/NFTCard";
import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../consts/contractAddresses";


const Home: NextPage = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

    const address = useAddress();
    const { contract: nftDropContract } = useContract(
      nftDropContractAddress,
      "nft-drop"
    );
    const { contract: tokenContract } = useContract(
      tokenContractAddress,
      "token"
    );
    const { contract, isLoading } = useContract(stakingContractAddress);
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { data: stakedTokens } = useContractRead(
      contract,
      "getStakeInfo",
      [address]
    );
  
    useEffect(() => {
      if (!contract || !address) return;
  
      async function loadClaimableRewards() {
        const stakeInfo = await contract?.call("getStakeInfo", [address]);
        setClaimableRewards(stakeInfo[1]);
      }
  
      loadClaimableRewards();
    }, [address, contract]);
  
    async function stakeNft(id: string) {
      if (!address) return;
  
      const isApproved = await nftDropContract?.isApproved(
        address,
        stakingContractAddress
      );
      if (!isApproved) {
        await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
      }
      await contract?.call("stake", [id]);
    }
  
    if (isLoading) {
      return <div></div>;
    }


    return (
      <div className={styles.container}>
        <p className={styles.minting}> 
        <br /><br />
        <ConnectWallet btnTitle="Connect Wallet" className={styles.wallet} />
        <h1 className={styles.h1}>Mint Angry Animals NFTs</h1>
  
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
  
        <p className={styles.explain}>
        <b>Phase 1 Unreveal Mint</b> costs 1 NFT <b>3 Matic</b> and goes until April 30th.
         <br /><br /> 
         <b>Phase 2 Reveal Mint</b> costs 1 NFT <b>4 Matic</b> and runs until May 31th.
        </p>
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
  
  
        
  
        <div className={styles.quantityContainer}>
                      <button
                        className={`${styles.quantityControlButton}`}
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
  
                      <h4>{quantity}</h4>
  
                      <button
                        className={`${styles.quantityControlButton}`}
                        onClick={() => setQuantity(quantity + 1)}
                        
                      >
                        +
                      </button>
                    </div>
  
                    
  
        <Web3Button
          className={styles.wallet}
          contractAddress={nftDropContractAddress}
          action={(contract) => contract.erc721.claim(quantity)}
          onSuccess={() => {
            setQuantity(1);
            
          }}
          onError={(error) => {
            
          }}
        >
          Mint An NFT
        </Web3Button>
        <br /><br /> 
        </p>

        <p className={styles.staking}> 
        <h1 className={styles.h1}>Stake Your NFTs</h1>
        <hr className={`${styles.divider} ${styles.spacerTop}`} />
  


          <>
            <h2>Your Tokens</h2>
            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {tokenBalance?.symbol}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                </p>
              </div>
            </div>
  
            <Web3Button
              className={styles.wallet}
              action={(contract) => contract.call("claimRewards")}
              contractAddress={stakingContractAddress}
            >
              Claim Rewards
            </Web3Button>
  
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h2>Your Staked NFTs</h2>
            <div className={styles.nftBoxGrid}>
              {stakedTokens &&
                stakedTokens[0]?.map((stakedToken: BigNumber) => (
                  <NFTCard
                    tokenId={stakedToken.toNumber()}
                    key={stakedToken.toString()}
                  />
                ))}
            </div>
  
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h2>Your Unstaked NFTs</h2>
            <div className={styles.nftBoxGrid}>
              {ownedNfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3>{nft.metadata.name}</h3>
                  <Web3Button
                    className={styles.wallet}
                    contractAddress={stakingContractAddress}
                    action={() => stakeNft(nft.metadata.id)}
                  >
                    Stake
                  </Web3Button>
                </div>
              ))}
            </div>
          </>
       

          </p>
      </div>
    );

    
  };
  
  export default Home;
