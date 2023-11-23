import Head from "next/head";
import { useEffect, useState } from "react";
import Script from "next/script";
import SearchBar from "@/components/SearchBar";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

const Home = () => {
    const [ChemDoodle_, setChemDoodle_] = useState<any>(undefined);
    const [model, setModel] = useState<any>(undefined);
    const [moleculeList, setMoleculeList] = useState<any>([]);
    const [molFiles, setMolFiles] = useState<any>({});

    useEffect(() => {
        if (!ChemDoodle_ || !window) return;

        let model = new ChemDoodle_.RotatorCanvas3D(
            "animationCanvas",
            window.innerWidth,
            window.innerHeight
        );

        /*lewis*/
        // https://web.chemdoodle.com/demos/lewis-dot-structures#customise-template
        // let lewis = new ChemDoodle_.TransformCanvas("lewis", 350, 350);
        // lewis.styles.bonds_lewisStyle_2D = true;
        // lewis.styles.atoms_displayAllCarbonLabels_2D = true;
        // lewis.styles.atoms_implicitHydrogens_2D = false;
        // let hey = model.getMolecule();
        // console.log(new ChemDoodle_.io.JSONInterpreter().molTo(hey));
        // ChemDoodle_.iChemLabs.createLewisDotStructure(
        //     model.getMolecule(),
        //     {},
        //     function (mol: any) {
        //         lewis.loadMolecule(mol);
        //     }
        // );

        model.styles.set3DRepresentation("Ball and Stick");
        model.styles.backgroundColor = "black";
        model.styles.atoms_displayLabels_3D = true;
        model.styles.text_font_size = 16;
        setModel(model);

        fetch("/api/getMoleculeData")
            .then((response) => response.json())
            .then((data) => {
                setMoleculeList(data);
                if (!localStorage.getItem("last-molecule-formula"))
                    localStorage.setItem(
                        "last-molecule-formula",
                        data[0].formulaAsText
                    );

                loadMolecule(
                    data.find(
                        (molecule: any) =>
                            molecule.formulaAsText ==
                            localStorage.getItem("last-molecule-formula")
                    ).fileName,
                    model
                );
            });
    }, [ChemDoodle_]);

    const loadMolecule = async (fileName: string, model: any) => {
        // if given file's content exists in state already, use that
        // if it doesn't exist, pull it
        let molContent: string = "";

        if (!Object.keys(molFiles).includes(fileName)) {
            await fetch(`/mol-files/${fileName}`)
                .then((response: any) => response.text())
                .then((fileContent: any) => {
                    molContent = fileContent;
                    setMolFiles({
                        ...molFiles,
                        [fileName]: fileContent,
                    });
                });
        } else {
            molContent = molFiles[fileName];
        }

        let molecule = ChemDoodle_.readMOL(molContent, 1);
        model.loadMolecule(molecule);
        model.startAnimation();
    };

    const startAnimation = () => model.startAnimation();
    const stopAnimation = () => model.stopAnimation();

    return (
        <>
            <Head>
                <title>3D Molekül Görüntüleyici</title>
                <meta
                    name="description"
                    content="Eskişehir Fatih Fen Lisesi 10-D öğrencileri Alper Bayraktar
            ve Kuzey Görgülü'nün geliştirdiği 3D Molekül Görüntüleyici projesidir.."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script
                src="/chemdoodle/ChemDoodleWeb.js"
                onReady={() => {
                    setChemDoodle_(ChemDoodle);
                }}
            />
            <SearchBar
                model={model}
                moleculeList={moleculeList}
                onMoleculeSelect={(molecule: any) => {
                    loadMolecule(molecule.fileName, model);
                    localStorage.setItem(
                        "last-molecule-formula",
                        molecule.formulaAsText
                    );
                }}
            />
            <canvas id="animationCanvas" style={{ zIndex: "-1" }}></canvas>
        </>
    );
};
export default Home;
