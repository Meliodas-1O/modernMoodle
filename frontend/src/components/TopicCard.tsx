import { ITopic } from "../models/ITopic";

function TopicCard({ topic }: { topic: ITopic }) {
     return (
          <div
               style={{
                    border: "2px solid black",
               }}
          >
               <h2>{topic.title} (#{topic.id})</h2>
               <p>{topic.description}</p>
          </div>
     );
}

export default TopicCard;
