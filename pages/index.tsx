import Head from "next/head";
import { useState } from "react";
import Script from "next/script";
import MainPage from "@/components";

const Home = () => {
    const [ChemDoodle_, setChemDoodle_] = useState(undefined);

    return (
        <>
            {/* <Head>
                <title>3D Molekül Görüntüleyici</title>
                <meta
                    name="description"
                    content="Eskişehir Fatih Fen Lisesi (EFFL) 10-D öğrencisi Alper Bayraktar
                    tarafından geliştirilmiş 3D Molekül Görüntüleyici projesidir."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            {/* <Script
                src="/chemdoodle/ChemDoodleWeb.js"
                onReady={() => {
                    setChemDoodle_(ChemDoodle);
                }}
            /> */}
            {/* <MainPage ChemDoodle_={ChemDoodle_} /> */}
            Hello world!
        </>
    );
};
export default Home;
