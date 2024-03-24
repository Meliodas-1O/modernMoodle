import { useParams } from "react-router-dom";
import { IChapter } from "../models/IChapter.interface";
import ChapterList from "../components/ChapterList";

type TopicParams = {
     id: string;
};

function Topic() {
     const { id } = useParams<TopicParams>();
     const chapters: IChapter[] = [
          {
               id: 1,
               title: "Introduction to Programming",
               description:
                    "This chapter provides an overview of programming concepts and the importance of coding in the modern world.",
          },
          {
               id: 2,
               title: "Variables and Data Types",
               description:
                    "Learn how to declare and use variables, as well as the various data types available in programming.",
          },
          {
               id: 3,
               title: "Control Structures",
               description:
                    "Explore conditional statements and loops to control the flow of your program.",
          },
          {
               id: 4,
               title: "Functions and Methods",
               description:
                    "Understand how to create and use functions and methods to organize and reuse code.",
          },
          {
               id: 5,
               title: "Object-Oriented Programming",
               description:
                    "Dive into the principles of object-oriented programming, including classes, objects, and inheritance.",
          },
     ];
     return (
          <div>
               <p>hello, my id is {id}</p>
               <ChapterList chapters={chapters} />
          </div>
     );
}

export default Topic;
