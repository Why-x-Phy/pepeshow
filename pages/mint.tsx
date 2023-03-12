import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { nftDropContractAddress } from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";

const Mint: NextPage = () => {
  const router = useRouter();

  {/*
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint An NFT!</h1>

      <p className={styles.explain}>
        Here is where we use our <b>NFT Drop</b> contract to allow users to mint
        one of the NFTs that we lazy minted.
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        colorMode="dark"
        accentColor="#5204BF"
        contractAddress={nftDropContractAddress}
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => {
          alert("NFT Claimed!");
          router.push("/stake");
        }}
        onError={(error) => {
          alert(error);
        }}
      >
        Claim An NFT
      </Web3Button>
    </div>
  ); 
 }; 

 export default Mint; */}



  return (
  <div className={styles.container}>
    <div className={styles.mintInfoContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>

          <div className={styles.imageSide}>
            

            {claimConditions.data?.length === 0 ||
            claimConditions.data?.every(
              (cc) => cc.maxClaimableSupply === "0"
            ) ? (
              <div>
                <h2>
                  This drop is not ready to be minted yet. (No claim condition
                  set)
                </h2>
              </div>
            ) : !activeClaimCondition.data && claimConditions.data ? (
              <div>
                <h2>Drop starts in:</h2>
                <Timer date={claimConditions.data[0].startTime} />
              </div>
            ) : (
              <>
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
                    disabled={quantity >= maxClaimable}
                  >
                    +
                  </button>
                </div>

                <div className={styles.mintContainer}>
                  {isSoldOut ? (
                    <div>
                      <h2>Sold Out</h2>
                    </div>
                  ) : (
                    <Web3Button
                      contractAddress={nftDropContractAddress}
                      action={(cntr) => cntr.erc721.claim(quantity)}
                      isDisabled={!canClaim || buttonLoading}
                      onError={(err) => {
                        console.error(err);
                        alert("Error claiming NFTs");
                      }}
                      onSuccess={() => {
                        setQuantity(1);
                        alert("Successfully claimed NFTs");
                        router.push("/stake");
                      }}
                    >
                      {buttonLoading ? "Loading..." : buttonText}
                    </Web3Button>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>

  </div>
 );

}; 
export default Mint;