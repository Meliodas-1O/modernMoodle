export interface ErrorMessage {
     status: number;
     message: string;
}

export function errorMessage(
     status: number,
     errorMessage: string
): ErrorMessage {
     return {
          status: status,
          message: errorMessage,
     };
}

export function areKeysNotValid(
     obj: Record<string, string>,
     validKeys: string[]
): boolean {
     for (const key in obj) {
          if (!validKeys.includes(key)) {
               return true;
          }
     }
     return false;
}

export enum ChapterErrorMessages {
     EMPTY_REQUEST_BODY = "The request body is empty. Please put input values.",
     UPDATE_ERROR = "Error while updating the chapter. Please check your input values or try again later.",
     INVALID_FIELD = "One of the field is not appropriate. The valid keys are : ",
     CREATE_ERROR = "Error while creating the chapter. Please check your input values or try again later.",
     NO_CHAPTER_BY_ID = "There is no chapter with the given id. Please check your input values or try again later.",
     NO_CHAPTERS = "There is no chapter yet !",
     RETRIEVAL_ERROR = "Error while retrieving chapters. Please try again",
}

export enum ExerciseErrorMessages {
     EMPTY_REQUEST_BODY = "The request body is empty. Please put input values.",
     CREATE_ERROR = "Error while creating the exercise. Please check your input values or try again later.",
     INVALID_FIELD = `One of the field is not appropriate. The valid keys are: `,
     RETRIEVAL_ERROR = "Error while retrieving exercises. Please try again.",
     NO_EXERCISE_BY_ID = "There is no exercise with the given id. Please check your input values or try again later.",
     UPDATE_ERROR = "Error while updating the exercise. Please check your input values or try again later.",
}

export enum TopicErrorMessages {
     EMPTY_REQUEST_BODY = "The request body is empty. Please put input values.",
     CREATE_ERROR = "Error while creating the topic. Please check your input values or try again later.",
     INVALID_FIELD = `One of the field is not appropriate. The valid keys are: `,
     RETRIEVAL_ERROR = "Error while retrieving topics. Please try again.",
     NO_TOPIC_BY_ID = "There is no topic with the given id. Please check your input values or try again later.",
     UPDATE_ERROR = "Error while updating the topic. Please check your input values or try again later.",
}
