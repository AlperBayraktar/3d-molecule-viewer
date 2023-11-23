const ChemicalFormulaTextToHTML: any = (formula: any) =>
    formula
        .split(/(\d+)/)
        .map((token: any, idx: any) =>
            idx % 2 ? <sub key={idx}>{token}</sub> : token
        );

export default ChemicalFormulaTextToHTML;
