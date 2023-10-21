import { useEffect, useState } from "react";
import { ITopic } from "../models/ITopic";
import { backendAPI } from "../api/api";
import TopicCard from "./TopicCard";

function TopicsList() {
     const [topics, setTopics] = useState<ITopic[]>([]);

     useEffect(() => {
          // Get all topics when component mounts
          backendAPI.getAllTopics()
               .then((topics) => {
                    if (!topics) return;
                    setTopics(topics);
               })
               .catch((err) => console.error(`err: ${err}`));
     }, []);

     return (
        <div className="topics-list-div">
            {topics.map((topic) => (
                <TopicCard topic={topic} key={topic.id}/>
            ))}
        </div>
     );
}

export default TopicsList;
