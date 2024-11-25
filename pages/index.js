import Banner from "@/components/banner";
import Card from "@/components/card";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState("");
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    const fetchStores = async () => {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
          );
          

          const coffeeStores = await response.json();
          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });
          setCoffeeStoresError("");
        } catch (error) {
          console.log("error: ", error);
          setCoffeeStoresError(error.message);
        }
      }
    };

    fetchStores();
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    console.log("Banner here");
    handleTrackLocation();
  };

  return (
    <>
      <div className={styles.page}>
        <Head>
          <title>Coffee</title>
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.banner}>
            <Banner
              buttonText={
                isFindingLocation ? "Locating..." : "View stores nearby"
              }
              handleOnClick={handleOnBannerBtnClick}
            />
          </div>
          {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
          {coffeeStoresError && (
            <p>Something went wrong: {coffeeStoresError}</p>
          )}
          <div className={styles.heroImage}>
            <Image src="/static/hero-image.png" width={700} height={400} />
          </div>

          {coffeeStores.length > 0 && (
            <div className="sectionWrapper">
              <h2 className={styles.heading2}>Stores near me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {props.coffeeStores.length > 0 && (
            <div className="sectionWrapper">
              <h2 className={styles.heading2}>Chuong My stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
