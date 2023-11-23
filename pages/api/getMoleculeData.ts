import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") console.log("wrong");
    const data = [
        // 1
        {
            EnglishNames: ["Lactic acid"],
            TurkishNames: ["Laktik asit", "Lorem ipsum", "Dolor sit amet"],
            formulaAsText: "C3H6O3",
            formulaAsLatex: "",
            fileName: "Lactic acid.mol",
        },
        // 2
        {
            EnglishNames: ["Benzene"],
            TurkishNames: ["Benzen"],
            formulaAsText: "C6H6",
            formulaAsLatex: "",
            fileName: "Benzene.mol",
        },
        // 3
        {
            EnglishNames: ["Naphthalene"],
            TurkishNames: ["Naftalin"],
            formulaAsText: "C10H8",
            formulaAsLatex: "",
            fileName: "Naphthalene.mol",
        },
        // 4
        {
            EnglishNames: ["Water"],
            TurkishNames: ["Su"],
            formulaAsText: "H2O",
            formulaAsLatex: "",
            fileName: "Water.mol",
        },
        // 5
        {
            EnglishNames: ["Ammonia"],
            TurkishNames: ["Amonyak"],
            formulaAsText: "NH3",
            formulaAsLatex: "",
            fileName: "Ammonia.mol",
        },
        // 6
        {
            EnglishNames: ["Ethyl Alcohol"],
            TurkishNames: ["Etil Alkol"],
            formulaAsText: "C2H6O",
            formulaAsLatex: "",
            fileName: "Ethyl alcohol.mol",
        },
        // 7
        {
            EnglishNames: ["Glycerin"],
            TurkishNames: ["Gliserin"],
            formulaAsText: "C3H8O3",
            formulaAsLatex: "",
            fileName: "Glycerin.mol",
        },
        // 8
        {
            EnglishNames: ["Sodium Chloride"],
            TurkishNames: ["Sodyum Klorür"],
            formulaAsText: "NaCl",
            formulaAsLatex: "",
            fileName: "Sodium chloride.mol",
        },
        // 9
        {
            EnglishNames: ["Sulphur Dioxide"],
            TurkishNames: ["Kükürt Dioksit"],
            formulaAsText: "SO2",
            formulaAsLatex: "",
            fileName: "Sulphur dioxide.mol",
        },
        // 10
        {
            EnglishNames: ["Sulphur Trioxide"],
            TurkishNames: ["Kükürt Trioksit"],
            formulaAsText: "SO3",
            formulaAsLatex: "",
            fileName: "Sulphur trioxide.mol",
        },
        // 11
        {
            EnglishNames: ["Phosphorus Trichloride"],
            TurkishNames: ["Fosfor Triklorür"],
            formulaAsText: "PCl3",
            formulaAsLatex: "",
            fileName: "Phosphorus trichloride.mol",
        },
        // 12
        {
            EnglishNames: ["Phosphorus Trihydride"],
            TurkishNames: ["Fosfor Trihidrür"],
            formulaAsText: "PH3",
            formulaAsLatex: "",
            fileName: "Phosphorus trihydride.mol",
        },
        // 13
        {
            EnglishNames: ["Calcium Oxide"],
            TurkishNames: ["Kalsiyum Oksit"],
            formulaAsText: "CaO",
            formulaAsLatex: "",
            fileName: "Calcium oxide.mol",
        },
        // 14
        {
            EnglishNames: ["Calcium Chloride"],
            TurkishNames: ["Kalsiyum Klorür"],
            formulaAsText: "CaCl2",
            formulaAsLatex: "",
            fileName: "Calcium chloride.mol",
        },
        // 15
        {
            EnglishNames: ["Hydrogen Sulphide"],
            TurkishNames: ["Hidrojen Sülfür"],
            formulaAsText: "H2S",
            formulaAsLatex: "",
            fileName: "Hydrogen sulphide.mol",
        },
    ];
    res.status(200).json(data);
}
