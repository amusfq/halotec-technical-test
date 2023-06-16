import { ReactElement } from "react";
import { Image, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebar = [
    {
      label: "Beranda",
      to: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Usulan Prodi Baru",
      to: "/usulan-prodi-baru",
      icon: <HomeIcon />,
    },
    {
      label: "Petunjuk",
      to: "/",
      icon: <HomeIcon />,
    },
  ];

  return (
    <div
      style={{ width: "240px", background: "#F4F5FA" }}
      className="position-fixed top-0 left-0 bottom-0"
    >
      <Stack direction="horizontal" className="p-3">
        <Image src="/logo.png" rounded width={64} className="me-1" />
        <Stack>
          <span
            style={{
              fontWeight: "500",
              fontSize: "14px",
              color: "#1C1C1C",
            }}
          >
            DIKTIS KEMENAG
          </span>
          <span
            style={{
              fontWeight: "400",
              fontSize: "12px",
              color: "#969696",
            }}
          >
            Ditjen Pendidikan Islam Direktorat PTKI
          </span>
        </Stack>
      </Stack>
      {sidebar.map((item, idx) => (
        <SidebarItem
          key={idx}
          label={item.label}
          icon={item.icon}
          to={item.to}
        />
      ))}
    </div>
  );
};

type SidebarItemType = {
  label: string;
  to: string;
  icon: ReactElement;
};

const SidebarItem = ({ label, to, icon }: SidebarItemType) => {
  return (
    <Link to={to}>
      <Stack
        direction="horizontal"
        className="ps-3 sidebar-item"
      >
        <div
          style={{
            borderRadius: "100%",
            background: "#E0E0E0",
            width: "32px",
            height: "32px",
          }}
          className="me-2"
        >
          {icon}
        </div>
        <span style={{ fontSize: "16px" }}>{label}</span>
      </Stack>
    </Link>
  );
};

const HomeIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      opacity="0.5"
      x="4"
      y="4"
      width="40"
      height="40"
      rx="20"
      fill="#E0E0E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 15V21H15V15H33ZM17 17H31V19H17V17Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 23V33H25V23H33ZM27 25H31V31H27V25Z"
      fill="currentColor"
    />
    <path d="M15 23H23V25H15V23Z" fill="currentColor" />
    <path d="M23 27H15V29H23V27Z" fill="currentColor" />
    <path d="M15 31H23V33H15V31Z" fill="currentColor" />
  </svg>
);

export default Sidebar;
