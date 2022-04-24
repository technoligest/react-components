import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { Showcase } from '../src/Showcase/Showcase';

const Home = () => {
  return <Showcase />;
};

export const getStaticProps: GetStaticProps = context => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Home;
