import {
     Box,
     Button,
     Card,
     CardBody,
     CardHeader,
     Divider,
     HStack,
     Heading
} from "@chakra-ui/react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { ITopic } from "../models/ITopic";

function TopicCard({ topic }: { topic: ITopic }) {
     function getDisplayableDescription(description: string): string {
          let displayableDescription = description.substring(0, 20);
          if (description.length > 20) {
               displayableDescription =
                    displayableDescription.substring(0, 17) + "...";
          }
          return displayableDescription;
     }

     return (
          <Card>
               <CardHeader>
                    <Heading size={"md"}>{topic.title}</Heading>
                    <Divider width={"80%"} marginTop={"5px"} />
               </CardHeader>
               <CardBody>
                    <HStack>
                         <Box width={"90%"}>
                              {getDisplayableDescription(topic.description)}
                         </Box>
                         <Box>
                              <Button
                                   rightIcon={<BsFillArrowRightCircleFill />}
                              />
                         </Box>
                    </HStack>
               </CardBody>
          </Card>
     );
}

export default TopicCard;
