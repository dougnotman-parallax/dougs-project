import { Navbar, NavbarBrand, NavbarMenu, NavbarItem } from "cdf-design-system-alpha";
import { useLocation, useNavigate } from "react-router-dom";

export const TopNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar variant="bordered" position="static" height="md">
      <NavbarBrand title="Dune Creation Lab" />
      <NavbarMenu orientation="horizontal" gap="md">
        <NavbarItem
          active={isActive("/")}
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          Home
        </NavbarItem>
        <NavbarItem
          active={isActive("/playground")}
          onClick={() => navigate("/playground")}
          className="cursor-pointer"
        >
          Playground
        </NavbarItem>
        <NavbarItem
          active={isActive("/analysis")}
          onClick={() => navigate("/analysis")}
          className="cursor-pointer"
        >
          Analysis
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};

