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

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

const MainPage = ({ ChemDoodle_ }: any) => {
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
          localStorage.setItem("last-molecule-formula", data[0].formulaAsText);

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

  return (
    <>
      <SearchBar
        model={model}
        moleculeList={moleculeList}
        onMoleculeSelect={(molecule: any) => {
          loadMolecule(molecule.fileName, model);
          localStorage.setItem("last-molecule-formula", molecule.formulaAsText);
        }}
      />
      <canvas id="animationCanvas" style={{ zIndex: "-1" }}></canvas>
    </>
  );
};
export default MainPage;
