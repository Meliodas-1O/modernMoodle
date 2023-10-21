import { useState } from "react";
import { ITopicCreation } from "../models/ITopic";
import { backendAPI } from "../api/api";

function CreateTopic() {
     const [formData, setFormData] = useState<{
          title: string;
          description: string;
     }>({
          title: "",
          description: "",
     });

     function handleCreateTopic() {
          if (
               formData.title.trim().length === 0 ||
               formData.description.trim().length === 0
          ) {
               return;
          }

          const newTopic: ITopicCreation = {
               title: formData.title,
               description: formData.description,
          };

          backendAPI.createTopic(newTopic)
               .then((topicId) => {
                    if (!topicId) return;
                    console.log(`Created topic with id: ${topicId}`);
               })
               .catch((err) => console.error(`err: ${err}`));
     }

     return (
          <div className="create-topic">
               <h1>Create new topic</h1>
               <label>Title:</label>
               <input
                    type="text"
                    placeholder={formData.title}
                    onChange={(event) => {
                         const title = event.target.value;
                         setFormData({ ...formData, title });
                    }}
               />
               <br />
               <label>Description:</label>
               <input
                    type="text"
                    placeholder={formData.description}
                    onChange={(event) => {
                         const description = event.target.value;
                         setFormData({ ...formData, description });
                    }}
               />
               <br />
               <button onClick={() => handleCreateTopic()}>create</button>
          </div>
     );
}

export default CreateTopic;
