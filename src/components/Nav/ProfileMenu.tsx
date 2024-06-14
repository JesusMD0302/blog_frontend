"use client";

import { useToggle } from "@/hooks/useToggle";
import {
  Box,
  IconButton,
  Typography,
  Link as MuiLink,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";

const settings = [{ label: "Perfil", url: "/profile" }, "Cerrar sesión"];

export default function ProfileMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoading, _, setIsLoadingFalse] = useToggle(true);

  const { data } = useSession();
  const path = usePathname();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    signOut({ callbackUrl: "/" });
    handleCloseUserMenu();
  };

  useEffect(() => {
    setIsLoadingFalse();
  }, [setIsLoadingFalse]);

  if (isLoading || path === "/auth/login") return null;

  if (!isLoading && !data)
    return (
      <Box component="section">
        <Link href="/auth/login" passHref>
          <Button
            color="success"
            variant="contained"
            sx={{ textWrap: "nowrap" }}
          >
            Iniciar sesión
          </Button>
        </Link>
      </Box>
    );

  return (
    <Box component="section">
      <>
        <Tooltip title="Opciones">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Jesus Mena" src="/assets/avatar/avatar.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => {
            if (setting instanceof Object) {
              return (
                <Link
                  key={setting.label}
                  href={setting.url}
                  passHref
                  legacyBehavior
                >
                  <MuiLink underline="none">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography component="p" textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  </MuiLink>
                </Link>
              );
            }

            return (
              <MenuItem key={setting} onClick={handleSignOut}>
                <Typography component="p" textAlign="center">
                  {setting}
                </Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </>
    </Box>
  );
}
