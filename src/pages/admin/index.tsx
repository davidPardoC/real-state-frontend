import React from "react";

const index = () => {
  return <div>index</div>;
};

export default index;

export async function getServerSideProps(context) {
  console.log(context.req.headers.cookie);
  return { props: {} };
}
