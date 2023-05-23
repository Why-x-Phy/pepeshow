import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();


  return (
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1}>Welcome to the Unreveal Dashboard</h1>
      <div className={styles.nftBoxGrid}>
        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/node`)}
        >
          {/* Mint a new NFT */}
          <Image src="/icons/drop.webp" alt="drop" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Node Area</h2>
          <p className={styles.selectBoxDescription}>
          Use the custom staking contract deployed via <b>thirdweb Deploy</b>{" "}
            to stake your NFTs, and earn tokens from the <b>Token</b> contract.
          </p>
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/season1`)}
        >
          {/* Staking an NFT */}
          <Image src="/icons/drop.webp" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Season 1</h2>
          <p className={styles.selectBoxDescription}>
            Use the custom staking contract deployed via <b>thirdweb Deploy</b>{" "}
            to stake your NFTs, and earn tokens from the <b>Token</b> contract.
          </p>
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/season2`)}
        >
          {/* Mint a new NFT */}
          <Image src="/icons/drop.webp" alt="drop" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Season 2</h2>
          <p className={styles.selectBoxDescription}>
          Use the custom staking contract deployed via <b>thirdweb Deploy</b>{" "}
            to stake your NFTs, and earn tokens from the <b>Token</b> contract.
          </p>
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/season3`)}
        >
          {/* Staking an NFT */}
          <Image src="/icons/drop.webp" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Season 3</h2>
          <p className={styles.selectBoxDescription}>
            Use the custom staking contract deployed via <b>thirdweb Deploy</b>{" "}
            to stake your NFTs, and earn tokens from the <b>Token</b> contract.
          </p>
        </div>

      </div>
    </div>
    
  );
};

export default Home;