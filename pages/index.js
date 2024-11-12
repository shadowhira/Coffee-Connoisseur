import Banner from "@/components/banner";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

export default function Home() {

  const handleOnBannerBtnClick = () => {
    console.log('Banner here');
  }

  return (
    <>
      <div className={styles.page}>
        <Head>
          <title>Coffee</title>
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <main className={styles.main}>
          {/* <h1 className={styles.title}>Coffee</h1> */}
          <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick}/>
        </main>
      </div>
    </>
  );
}
