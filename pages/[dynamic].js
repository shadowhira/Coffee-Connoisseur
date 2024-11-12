import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Dynamic = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{router.query.dynamic}</title>
      </Head>
    </div>
  );
};

export default Dynamic;
