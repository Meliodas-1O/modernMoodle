import { useState } from "react";
import { createTopic, deleteTopic, getAllTopics } from "../api/api";
import TopicCard from "../components/TopicCard";
import { ITopic } from "../models/ITopic";

function Administration() {
     const [topicFormData, setTopicFormData] = useState<{
          title: string;
          description: string;
     }>({ title: "", description: "" });
     const [topics, setTopics] = useState<ITopic[]>([]);

     function submitTopicFormData() {
          // Create new topic and send it to the backend
          const newTopic: ITopic = {
               title: topicFormData.title,
               description: topicFormData.description,
          };
          createTopic(newTopic)
               .then((response) => {
                    if(response) {
                         // add current topics to the list
                         newTopic.id = response;
                         setTopics([...topics, newTopic]);
                    }
               })
               .catch((err) => console.error(`err: ${err}`));
     }

     function refreshTopicsList() {
          getAllTopics()
               .then((response) => {
                    if (response) {
                         setTopics(response);
                    }
               })
               .catch((err) => console.error(`err: ${err}`));
     }

     function deleteTopicCard(id: number) {
          deleteTopic(id)
               .then((_) => {
                    // delete this topic from `topics`
                    let newTopics: ITopic[] = [];
                    for (const topic of topics) {
                         if (topic.id! !== id) {
                              newTopics.push(topic);
                         }
                    }
                    setTopics(newTopics);
               })
               .catch((err) => console.error(`err: ${err}`));
     }

     return (
          <div>
               <h1>Administration</h1>

               <div>
                    <h2>Create topic</h2>

                    <label>Title :</label>
                    <input
                         type="text"
                         onChange={(event) => {
                              const titleValue = event.target.value;
                              setTopicFormData({
                                   ...topicFormData,
                                   title: titleValue,
                              });
                         }}
                    />

                    <br />

                    <label>Description :</label>
                    <input
                         type="text"
                         onChange={(event) => {
                              const descriptionValue = event.target.value;
                              setTopicFormData({
                                   ...topicFormData,
                                   description: descriptionValue,
                              });
                         }}
                    />

                    <br />

                    <button onClick={() => submitTopicFormData()}>Ok</button>
               </div>

               <div>
                    <h2>Topics list</h2>
                    <button onClick={() => refreshTopicsList()}>
                         refresh list
                    </button>
                    {topics.map((topic, index) => (
                         <div key={index}>
                              <TopicCard topic={topic} />
                              <button
                                   onClick={() => deleteTopicCard(topic.id!)}
                              >
                                   delete
                              </button>
                         </div>
                    ))}
               </div>
          </div>
     );
}

export default Administration;
