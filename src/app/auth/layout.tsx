import { Container } from "@mui/material";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container
      component="article"
      maxWidth="sm"
      sx={{
        height: { xs: "calc(100vh - 56px)", md: "calc(100vh - 64px)" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </Container>
  );
}
