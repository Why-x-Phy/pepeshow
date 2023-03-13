import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { nftDropContractAddress } from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import { useMemo, useState } from "react";


const Mint: NextPage = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint An NFT!</h1>

      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <p className={styles.explain}>
       Phase 1 <b>Unreveal Mint</b> <br /><br />
       costs 1 NFT <b>2 Matic</b> and goes until April 30th.
       
      </p>

      <p className={styles.explain}>
       
       Phase 2 <b>Reveal Mint</b> Costs 1 NFT <b>3 Matic</b> and runs until May 31th.
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
        colorMode="dark"
        accentColor="#595858"
        contractAddress={nftDropContractAddress}
        action={(contract) => contract.erc721.claim(quantity)}
        onSuccess={() => {
          setQuantity(1);
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

export default Mint;