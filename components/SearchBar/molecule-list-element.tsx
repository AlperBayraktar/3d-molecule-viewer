import { Box, Heading, Text, Code } from "@chakra-ui/react";
import { useState } from "react";
import ChemicalFormulaTextToHTML from "./chemical-formula-text-to-html";

const MoleculeListElement = ({
    index,
    molecule,
    onSelect,
    closeModal,
}: any) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Box
            py="1"
            px="2"
            borderRadius={"4"}
            transition={".25s"}
            bgColor={isHovered ? "gray.800" : "gray.900"}
            cursor={isHovered ? "pointer" : "default"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                onSelect(molecule);
                closeModal();
            }}
        >
            <Heading size="s" textTransform="capitalize" fontWeight={"medium"}>
                <Text color="gray.300" display={"inline"}>
                    {index + 1}.
                </Text>{" "}
                {molecule?.TurkishNames[0]}{" "}
                {ChemicalFormulaTextToHTML(molecule?.formulaAsText)}{" "}
                <Code fontSize="xs" colorScheme="green">
                    {molecule.formulaAsText ==
                        localStorage.getItem("last-molecule-formula") &&
                        "(Şuan Görüntüleniyor)"}
                </Code>
            </Heading>

            {molecule?.TurkishNames.slice(1, molecule?.TurkishNames.length)
                .length > 0 && (
                <i>
                    <Text fontSize="sm">
                        {molecule?.TurkishNames.slice(
                            1,
                            molecule?.TurkishNames.length
                        ).join(", ")}
                    </Text>
                </i>
            )}
        </Box>
    );
};

export default MoleculeListElement;
