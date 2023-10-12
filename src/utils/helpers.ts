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
