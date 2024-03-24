import { IChapter } from "../models/IChapter.interface";
import "../styles/chapter.style.css";

interface ChapterProps {
     chapter: IChapter;
}

function ChapterCard({ chapter }: ChapterProps) {
     return (
          <div className="chapter_card">
               <h2>{chapter.title}</h2>
               <li>{chapter.description}</li>
          </div>
     );
}

export default ChapterCard;
