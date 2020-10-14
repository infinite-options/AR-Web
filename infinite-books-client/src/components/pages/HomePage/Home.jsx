import React from "react";
import HeroSection from "./HeroSection";
import { homeObjOne } from "./HomepageData";

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
    </>
  );
}

export default Home;
