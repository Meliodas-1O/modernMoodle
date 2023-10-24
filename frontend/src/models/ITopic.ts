export interface ITopic {
     id: number;
     title: string;
     description: string;
}

export interface ITopicCreation {
     title: string;
     description: string;
}

export interface IChapter {
     id: number;
     topic_id: number;
     title: string;
     description: string;
}
