import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendAPI } from "../api/api";
import { Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { IChapter } from "../models/ITopic.interface";

type ChapterParams = {
     id: string;
};

function Chapter() {
     const { id } = useParams<ChapterParams>();
     const [chapter, setChapter] = useState<IChapter | null>(null);

     useEffect(() => {
          // Try to convert id to a number
          const chapterId = Number(id);
          if (isNaN(chapterId)) {
               console.error(`err: can't convert '${id}' to number`);
          }

          // Get chapter by Id from the backend
          backendAPI
               .getChapter(chapterId)
               .then((response) => {
                    if (!response) return;
                    setChapter(response);
               })
               .catch((err) => console.error(`err: ${err}`));
               
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     return (
          <div className="chapter">
               <Center>
                    <Heading>Chapter</Heading>
               </Center>
               {chapter && (
                    <div>
                         <Center>
                              <Heading size={"md"}>
                                   title: {chapter.title}
                              </Heading>
                         </Center>
                         <Text>description: {chapter.description}</Text>
                         <Grid
                              templateColumns="repeat(3, 1fr)"
                              templateRows="repeat(2, 1fr)"
                              gap={4}
                         >
                              <GridItem
                                   gridColumn="1 / 3"
                                   gridRow="1 / 2"
                                   style={{ backgroundColor: "red" }}
                              >
                                   aaaaaaaaaaaaaaaaaaa
                              </GridItem>

                              {/* Section B */}
                              <GridItem
                                   gridColumn="1 / 2"
                                   gridRow="3 / 14"
                                   style={{ backgroundColor: "yellow" }}
                              >
                                   bbbbbbbbb
                              </GridItem>

                              {/* Section C */}
                              <GridItem
                                   gridColumn="2 / 4"
                                   gridRow="3 / 14"
                                   style={{ backgroundColor: "blue" }}
                              >
                                   ccccccccc
                              </GridItem>
                         </Grid>
                    </div>
               )}
          </div>
     );
}

export default Chapter;
