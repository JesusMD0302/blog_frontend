"use client";

import { Box, colors } from "@mui/material";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box component="div" bgcolor={colors.blue[50]} minHeight="100vh">
      {children}
    </Box>
  );
}
