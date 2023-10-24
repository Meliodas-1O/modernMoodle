import { useParams } from "react-router-dom";

type TopicParams = {
     id: string;
};

function Topic() {
     const { id } = useParams<TopicParams>();

     return <div>hello, my id is {id}</div>;
}

export default Topic;
