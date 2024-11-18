import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, radius, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=${radius}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  let allPhotos = [];
  const pagesToFetch = 4;
  for (let page = 1; page <= pagesToFetch; page++) {
    const photos = await unsplash.search.getPhotos({
      query: "coffee shop",
      page,
      perPage: 10,
    });
    const unsplashResults = photos.response.results;
    allPhotos = [
      ...allPhotos,
      ...unsplashResults.map((result) => result.urls["small"]),
    ];
  }
  return allPhotos;
};

export const fetchCoffeeStores = async (
  latLong = "20.925427497267926%2C105.6784635211802",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", "15000", limit),
    options
  );
  const data = await response.json();
  // .catch(err => console.error(err));

  const placeholderImage =
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";
  const placeholderAddress = "Address not available";
  const placeholderLocality = "Locality not available";

  return data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location?.address || placeholderAddress,
      locality: result.location?.locality || placeholderLocality,
      imgUrl: photos[idx] || placeholderImage,
    };
  });
};
