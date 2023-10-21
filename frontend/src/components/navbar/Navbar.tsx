import { Flex } from "@chakra-ui/react";
import NavbarItem from "./NavbarItem";
import { useState } from "react";

function Navbar() {
     const [activeItem, setActiveItem] = useState<string>("Home");

     return (
          <div className="Navbar">
               <Flex>
                    <NavbarItem
                         title="Home"
                         pathTo="/"
                         isActive={activeItem === "Home"}
                         setIsActive={setActiveItem}
                    />
                    <NavbarItem
                         title="Create new topic"
                         pathTo="/createTopic"
                         isActive={activeItem === "Create new topic"}
                         setIsActive={setActiveItem}
                    />
                    <NavbarItem
                         title="Administration"
                         pathTo="/admin"
                         isActive={activeItem === "Administration"}
                         setIsActive={setActiveItem}
                    />
               </Flex>
          </div>
     );
}

export default Navbar;
