import { config } from "../config/config";
import { ITopic } from "../models/ITopic";

export async function getAllTopics(): Promise<ITopic[] | undefined> {
     const response = await fetch(`${config.BACKEND.url}/topics`);

     if (response.status.toString().startsWith("2")) {
          // HTTP OK 2xx
          const topics: ITopic[] = await response.json();
          return topics;
     }

     return undefined;
}

export async function createTopic(topic: ITopic): Promise<number | undefined> {
     const response = await fetch(`${config.BACKEND.url}/topics`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(topic),
     });

     if (response.status.toString().startsWith("2")) {
          // HTTP OK 2xx
          const id: number = await response.json();
          return id;
     }

     return undefined;
}

export async function deleteTopic(topicId: number): Promise<void> {
     // TODO: wait for backend update as it always return HTTP 200
     const _ = await fetch(`${config.BACKEND.url}/topics/${topicId}`, {
          method: "DELETE",
     });
}

export async function updateTopic(
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
