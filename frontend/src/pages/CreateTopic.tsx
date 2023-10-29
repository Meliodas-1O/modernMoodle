import { useState } from "react";
import { ITopicCreation } from "../models/ITopic.interface";
import { backendAPI } from "../api/api";
import {
     Button,
     Center,
     Heading,
     Input,
     Text,
     useToast,
} from "@chakra-ui/react";

function CreateTopic() {
     const [formData, setFormData] = useState<{
          title: string;
          description: string;
     }>({
          title: "",
          description: "",
     });
     const toast = useToast();

     function handleCreateTopic() {
          if (
               !formData.title.trim().length ||
               !formData.description.trim().length
          ) {
               return;
          }

          const newTopic: ITopicCreation = {
               title: formData.title,
               description: formData.description,
          };

          backendAPI
               .createTopic(newTopic)
               .then((topicId) => {
                    if (!topicId) return;
                    console.log(`Created topic with id: ${topicId}`);
                    toast({
                         title: "Topic created.",
                         description: `Created with id: ${topicId}`,
                         status: "success",
                         duration: 9000,
                         isClosable: true,
                    });
               })
               .catch((err) => console.error(`err: ${err}`));
     }

     return (
          <div className="create-topic">
               <Center>
                    <Heading>Create new topic</Heading>
               </Center>
               <Text>Title:</Text>
               <Input
                    type="text"
                    placeholder={formData.title}
                    onChange={(event) => {
                         const title = event.target.value;
                         setFormData({ ...formData, title });
                    }}
               />
               <br />
               <Text>Description:</Text>
               <Input
                    type="text"
                    placeholder={formData.description}
                    onChange={(event) => {
                         const description = event.target.value;
                         setFormData({ ...formData, description });
                    }}
               />
               <br />
               <Button onClick={() => handleCreateTopic()}>create</Button>
          </div>
     );
}

export default CreateTopic;
