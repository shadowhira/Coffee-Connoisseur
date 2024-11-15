import Banner from "@/components/banner";
import Card from "@/components/card";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => {
    console.log("Banner here");
  };

  return (
    <>
      <div className={styles.page}>
        <Head>
          <title>Coffee</title>
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Banner
            buttonText="View stores nearby"
            handleOnClick={handleOnBannerBtnClick}
          />
          <div className={styles.heroImage}>
            <Image src="/static/hero-image.png" width={700} height={400} />
          </div>
          {coffeeStoresData.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      imgUrl={coffeeStore.imgUrl}
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </>
          )}
          ;
        </main>
      </div>
    </>
  );
}
