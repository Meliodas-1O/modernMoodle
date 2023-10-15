import { useState } from "react";
import TopicCard from "../components/TopicCard";
import { ITopic } from "../models/ITopic";

const fakeTopics: ITopic[] = [
     {
          id: 1,
          title: "First topic",
          description: "it is what it",
     },
     {
          id: 2,
          title: "Second topic",
          description: "théorie synthétique de la courbure de Ricci",
     },
     {
          id: 3,
          title: "Third topic",
          description: "ecoconception",
     },
];

function Administration() {
     const [topics, setTopics] = useState<ITopic[]>([]);
     const [title, setTitle] = useState<string>("");
     const [description, setDescription] = useState<string>("");

     function getAllTopics() {
          // TODO: real API call to the backend
          if (topics.length === 0) {
               setTopics(fakeTopics);
          }
     }

     function createTopic() {
          if (title.trim().length === 0 || description.trim().length === 0) {
               return;
          }

          const newId = topics[topics.length - 1].id + 1;
          const newTopic: ITopic = {
               id: newId,
               title,
               description,
          };
          setTopics([...topics, newTopic]);
     }

     return (
          <div>
               <h1>Administration</h1>

               <button onClick={getAllTopics}>view all topics</button>
               <div>
                    <h2>All topics</h2>
                    {topics.length > 0 &&
                         topics.map((topic) => (
                              <TopicCard key={topic.id} topic={topic} />
                         ))}
               </div>

               <div>
                    <h2>Create a new topic</h2>
                    <div>
                         <input
                              type="text"
                              placeholder="topic title..."
                              onChange={(event) => setTitle(event.target.value)}
                         />
                         <input
                              type="text"
                              placeholder="topic description..."
                              onChange={(event) =>
                                   setDescription(event.target.value)
                              }
                         />
                         <button onClick={createTopic}>Create</button>
                    </div>
               </div>
          </div>
     );
}

export default Administration;
