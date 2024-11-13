import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Dynamic = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Query: {router.query.dynamic}</title>
        <br />
        <Link href="/">Back to home</Link>
      </Head>
    </div>
  );
};

export default Dynamic;
