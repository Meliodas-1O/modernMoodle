import { Center, Heading } from "@chakra-ui/react";
import TopicsList from "../components/TopicsList";

function Home() {
     return (
          <div>
               <Center>
                    <Heading>Home</Heading>
               </Center>

               <TopicsList />
          </div>
     );
}

export default Home;
