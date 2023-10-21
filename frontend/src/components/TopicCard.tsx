import { ITopic } from "../models/ITopic";

function TopicCard({ topic }: { topic: ITopic }) {
     return (
          <div
               style={{
                    border: "2px solid black",
               }}
          >
               <strong>topic #{topic.id}</strong>
               <ul>
                    <li>title: {topic.title}</li>
                    <li>description: {topic.description}</li>
               </ul>
          </div>
     );
}

export default TopicCard;
