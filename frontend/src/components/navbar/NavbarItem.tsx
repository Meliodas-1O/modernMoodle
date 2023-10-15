import { Link } from "react-router-dom";

interface NavbarItemProps {
     title: string;
     pathTo: string;
}

function NavbarItem({ title, pathTo }: NavbarItemProps) {
     return (
          <Link
               to={pathTo}
               style={{
                    padding: 10,
               }}
          >
               {title}
          </Link>
     );
}

export default NavbarItem;
