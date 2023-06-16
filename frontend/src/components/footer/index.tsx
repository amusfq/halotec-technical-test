import { Container, Stack } from "react-bootstrap";

const Footer = (props: Props) => {
  return (
    <Container
      fluid
      style={{ paddingTop: "10px", paddingBottom: "10px", color: "#3A3541AD" }}
    >
      <Stack direction="horizontal" style={{ justifyContent: "space-between" }}>
        <span>
          ©2023 Diktis. All Rights Reserved | Aplikasi Prodi Versi 2.0
        </span>
        <span>Support</span>
      </Stack>
    </Container>
  );
};

export default Footer;
