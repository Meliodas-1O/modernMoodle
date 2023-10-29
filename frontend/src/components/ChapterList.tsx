import { IChapter } from "../models/IChapter.interface";
import ChapterCard from "./ChapterCard";

interface ChapterListProps {
     chapters: IChapter[];
}

function ChapterList({ chapters }: ChapterListProps) {
     return (
          <div>
               {chapters.map((chapter) => {
                    return <ChapterCard chapter={chapter} key={chapter.id} />;
               })}
          </div>
     );
}

export default ChapterList;
