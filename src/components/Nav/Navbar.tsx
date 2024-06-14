import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <AppBar position="sticky" color="primary" component="header">
      <Toolbar component="nav">
        <Box
          component="section"
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <Link href="/" passHref legacyBehavior>
            <MuiLink underline="none">
              <Typography variant="h6" component="p" color="secondary">
                My Blog
              </Typography>
            </MuiLink>
          </Link>
        </Box>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}
