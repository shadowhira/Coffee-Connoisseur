import React from "react";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();

  return <div>Coffee store {router.query.id}</div>;
};

export default CoffeeStore;
