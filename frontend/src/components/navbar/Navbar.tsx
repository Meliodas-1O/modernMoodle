import NavbarItem from "./NavbarItem";

function Navbar() {
     return (
          <div className="Navbar">
               <NavbarItem title="home" pathTo="/" />
               <NavbarItem title="admin" pathTo="/admin" />
          </div>
     );
}

export default Navbar;
