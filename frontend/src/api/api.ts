import { config } from "../config/config";
import { ITopic, ITopicCreation } from "../models/ITopic";

async function getAllTopics(): Promise<ITopic[] | undefined> {
     const response = await fetch(`${config.BACKEND.url}/topics`);

     if (response.status.toString().startsWith("2")) {
          // HTTP OK 2xx
          const topics: ITopic[] = await response.json();
          return topics;
     }

     return undefined;
}

async function createTopic(topic: ITopicCreation): Promise<number | undefined> {
     const response = await fetch(`${config.BACKEND.url}/topics`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(topic),
     });

     if (response.status.toString().startsWith("2")) {
          // HTTP OK 2xx
          const id: { id: number } = await response.json();
          return id.id;
     }

     return undefined;
}

async function deleteTopic(topicId: number): Promise<void> {
     // TODO: wait for backend update as it always return HTTP 200
     await fetch(`${config.BACKEND.url}/topics/${topicId}`, {
          method: "DELETE",
     });
}

async function updateTopic(
     topicId: number,
     newTopic: ITopic
): Promise<ITopic | undefined> {
     const response = await fetch(`${config.BACKEND.url}/topics/${topicId}`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(newTopic),
     });

     if (response.status.toString().startsWith("2")) {
          // HTTP OK 2xx
          const newTopic: ITopic = await response.json();
          return newTopic;
     }

     return undefined;
}

// Export functions
export const backendAPI = {
     getAllTopics,
     createTopic,
     deleteTopic,
     updateTopic,
};
