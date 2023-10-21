import { Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface NavbarItemProps {
     title: string;
     pathTo: string;
     isActive: boolean;
     setIsActive: Dispatch<SetStateAction<string>>;
}

function NavbarItem({ title, pathTo, isActive, setIsActive }: NavbarItemProps) {
     return (
          <Link
               to={pathTo}
               style={{
                    padding: 10,
               }}
               onClick={() => setIsActive(title)}
          >
               <Text
                    color={isActive ? "green" : "black"}
                    fontWeight={isActive ? "bold" : "normal"}
               >
                    {title}
               </Text>
          </Link>
     );
}

export default NavbarItem;
