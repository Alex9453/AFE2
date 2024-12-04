import Link from "next/link";

const SideNav = ({ role }: { role: "trainer" | "manager" | "client" }) => {
  const links = {
    trainer: [
      { href: "/trainer-dashboard", label: "Home" },
      { href: "/trainer-dashboard/create-user", label: "Create client" },
      { href: "/trainer-dashboard/clients-overview", label: "Clients overview" },
      // Tilføj andre links til sidebar her
    ],
    manager: [
      { href: "/manager-dashboard", label: "Home" },
      { href: "/manager-dashboard/create-user", label: "Create personal trainer" },
    ],
    client: [
      { href: "/client-dashboard", label: "Home" },
      //Til
    ],
  };

  return (
    <nav>
      <header className="sidenav-header">Fitness App</header>
      <ul className="sidenav-list">
        {links[role]?.map((link, index) => (
          <li key={index} className="sidenav-item">
            <Link href={link.href} className="sidenav-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="sidenav-logout"
        onClick={() => {
          localStorage.removeItem("authToken");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default SideNav;
