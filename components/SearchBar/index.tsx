import {
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Icon,
  Box,
  CardFooter,
  Highlight,
  Text,
  HStack,
  Container,
  Link as ChakraLink,
  Image,
  VStack,
} from "@chakra-ui/react";
import { QuestionIcon, Search2Icon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import MoleculeListElement from "./molecule-list-element";
import { useEffect, useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import stringComparison from "string-comparison";
import NextLink from "next/link";

import NextJsIcon from "@/public/images/nextjs-icon.ico";
import ChakraIcon from "@/public/images/chakra-ui-icon.png";
import MolViewIcon from "@/public/images/molview-icon.svg";
import GithubIcon from "@/public/images/github-icon.svg";

const quicksortDescending: any = (arr: any) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex].similarity;
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].similarity > pivot) {
      left.push(arr[i]);
    } else if (arr[i].similarity < pivot) {
      right.push(arr[i]);
    }
  }

  return [
    ...quicksortDescending(left),
    arr[pivotIndex],
    ...quicksortDescending(right),
  ];
};

const SearchBar = ({ moleculeList, onMoleculeSelect, model }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAboutModalOpen,
    onOpen: onAboutModalOpen,
    onClose: onAboutModalClose,
  } = useDisclosure();
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [searchRelations, setSearchRelations] = useState<string[][]>([]);

  useEffect(() => {
    let init_searchRelations: string[][] = [];

    moleculeList.map((mol: any, index: number) => {
      init_searchRelations.push([
        ...mol.TurkishNames.map((name: any) => name.toLowerCase()),
        mol.formulaAsText.toLowerCase(),
      ]);
    });

    setSearchRelations(init_searchRelations);
  }, [moleculeList]);

  useEffect(() => {
    if (searchInput == "") {
      console.log("hey");
      setSearchResults([]);
      console.log(searchResults);
    }
    const temp: number[] = [];
    let similarities: any = [];

    searchRelations.map((relations: string[], index: number) => {
      relations.map((relation: string) => {
        similarities.push({
          moleculeIndex: index,
          relation: relation,

          similarity: relation.includes(searchInput)
            ? 1
            : stringComparison.levenshtein.similarity(
                searchInput.toLowerCase(),
                relation
              ),
        });
      });
    });

    similarities = quicksortDescending(similarities);

    similarities.map((similarity: any) => {
      if (!temp.includes(similarity.moleculeIndex))
        temp.push(similarity.moleculeIndex);
    });
    setSearchResults(temp);
  }, [searchInput]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      gap="8px"
      position="absolute"
      left="0"
      right="0"
      top="40px"
      m="auto"
      p="0"
      textAlign="center"
      maxWidth="fit-content"
    >
      <InputGroup onClick={onOpen}>
        <Input placeholder="Molekül Ara" variant="filled" />
        <InputRightElement>
          <Search2Icon />
        </InputRightElement>
      </InputGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"blackAlpha.800"} maxWidth={"50%"}>
          <ModalHeader>Molekül Ara</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup onClick={onOpen}>
              <Input
                placeholder="Molekül Ara"
                variant="filled"
                borderWidth={"1px"}
                value={searchInput}
                onChange={(e: any) => setSearchInput(e.target.value)}
              />
              <InputRightElement>
                <Search2Icon />
              </InputRightElement>
            </InputGroup>

            <Card
              bgColor={"blackAlpha.800"}
              overflowY="scroll"
              maxH={"60vh"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#2e4675",
                  borderRadius: "24px",
                },
              }}
            >
              <CardHeader p="0" mt="4" mb="2">
                <Heading size="s" fontWeight={"medium"}>
                  Tüm Bileşikler
                </Heading>
              </CardHeader>

              <CardBody p="0" m="0">
                <Stack spacing="4">
                  {(searchInput == ""
                    ? moleculeList
                    : searchResults.map((index: number) => moleculeList[index])
                  ).map((molecule: any, index: number) => (
                    <MoleculeListElement
                      key={index}
                      index={index}
                      molecule={molecule}
                      onSelect={onMoleculeSelect}
                      closeModal={onClose}
                    />
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAboutModalOpen} onClose={onAboutModalClose}>
        <ModalOverlay />
        <ModalContent bgColor={"blackAlpha.800"} maxWidth={"50%"}>
          <ModalHeader>Proje Hakkında</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack textAlign={"center"} gap="12px" mb="1.5rem">
              <Heading fontSize={"4xl"} fontWeight={400}>
                3D Molekül Görüntüleyici
              </Heading>
              <Text maxW={"70%"}>
                Eskişehir Fatih Fen Lisesi'nde (EFFL) yaptığım 10. sınıf kimya
                projem. Öğrencilerin kimyasal bileşiklerin 3 boyutlu
                görünümlerini daha rahat incelemesini sağlıyor.
              </Text>
              <Heading fontSize="2xl" mt={5} mb={2}>
                Tech Stack
              </Heading>
              <NextLink href="https://web.chemdoodle.com/" passHref>
                <ChakraLink target="_blank">
                  <Text fontSize={"lg"}>ChemDoodle Web Components</Text>
                </ChakraLink>
              </NextLink>
              <NextLink href="https://nextjs.org/" passHref>
                <ChakraLink target="_blank">
                  <HStack gap="1rem">
                    <Image
                      src={NextJsIcon.src}
                      width="40px"
                      height="40px"
                      title="Next.js"
                      alt="Next.js"
                    />
                    <Text fontSize={"lg"}>Next.js</Text>
                  </HStack>
                </ChakraLink>
              </NextLink>
              <NextLink href="https://chakra-ui.com/" passHref>
                <ChakraLink target="_blank">
                  <HStack gap="1rem">
                    <Image
                      src={ChakraIcon.src}
                      width="40px"
                      height="40px"
                      title="Chakra UI"
                      alt="Chakra UI"
                    />
                    <Text fontSize={"lg"}>Chakra UI</Text>
                  </HStack>
                </ChakraLink>
              </NextLink>
              <NextLink href="https://molview.org/" passHref>
                <ChakraLink target="_blank">
                  <HStack gap="1rem">
                    <Image
                      src={MolViewIcon.src}
                      width="40px"
                      height="40px"
                      title="MolView"
                      alt="MolView"
                    />
                    <Text fontSize={"lg"}>MolView</Text>
                  </HStack>
                </ChakraLink>
              </NextLink>
              <Heading fontSize="2xl" mt={5} mb={2}>
                GitHub'da Kodları İnceleyin
              </Heading>
              <NextLink
                href="https://github.com/AlperBayraktar/3d-molecule-viewer"
                passHref
              >
                <ChakraLink target="_blank">
                  <HStack gap="1rem">
                    <Image
                      src={GithubIcon.src}
                      width="40px"
                      height="40px"
                      title="Github Repo"
                      alt="Github Repo"
                    />
                    <Text fontSize={"lg"}>3d-molecule-viewer</Text>
                  </HStack>
                </ChakraLink>
              </NextLink>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Button
        onClick={() => {
          if (isRunning) {
            model?.stopAnimation();
            setIsRunning(false);
          } else {
            model?.startAnimation();
            setIsRunning(true);
          }
        }}
      >
        {isRunning ? (
          <Icon as={AiFillPauseCircle} fontSize="1.5rem" />
        ) : (
          <Icon as={AiFillPlayCircle} fontSize="1.5rem" />
        )}
      </Button>
      <Button onClick={onAboutModalOpen}>
        <QuestionIcon fontSize={"1.25rem"} />
      </Button>
    </Flex>
  );
};
export default SearchBar;
