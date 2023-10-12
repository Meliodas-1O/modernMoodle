export function errorMessage(status: number, errorMessage: string) {
     return {
          error: {
               status: status,
               message: errorMessage,
          },
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
     INVALID_FIELD = "One of the field is not appropriate. The valid keys are : [topic_id, title, description].",
     CREATE_ERROR = "Error while creating the chapter. Please check your input values or try again later.",
     NO_CHAPTER_BY_ID = "There is no chapter with the given id. Please check your input values or try again later.",
     NO_CHAPTERS = "There is no chapter yet !",
     RETRIEVAL_ERROR = "Error while retrieving chapters. Please try again",
}
