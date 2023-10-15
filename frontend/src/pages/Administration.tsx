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

     function getAllTopics() {
          // TODO: real API call to the backend
          setTopics(fakeTopics);
     }

     return (
          <div>
               <h1>Administration</h1>

               <button onClick={getAllTopics}>view all topics</button>

               <div>
                    {topics.length > 0 &&
                         topics.map((topic) => (
                              <TopicCard key={topic.id} topic={topic} />
                         ))}
               </div>
          </div>
     );
}

export default Administration;
