"use client";

import { useToggle } from "@/hooks/useToggle";
import { Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import EditProfileDialog from "./EditProfileDialog";
import { useSession } from "next-auth/react";
import useAxios from "@/hooks/useAxios";
import { use, useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function ProfileHeader() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<{
    email: string;
    id: string;
    username: string;
  } | null>(null);
  const [isUpdateProfileOpen, _, onCloseUpdateProfile, onOpenUpdateProfile] =
    useToggle();

  const { data } = useSession();
  const axios = useAxios();

  useEffect(() => {
    if (data) {
      setUserName(data!.user!.name ?? "");
    }
  }, [data]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userName) return;

      try {
        const res = await axios.get(`/users/${userName}`);
        const { username, ...user } = res.data;
        setUserData({ ...user, username: username.replace("@", "") });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <Box
      component="header"
      width="100%"
      bgcolor={(theme) => theme.palette.background.default}
    >
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Box
          component="section"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Avatar
            sx={{ bgcolor: "red", width: 150, height: 150 }}
            src="/assets/avatar/avatar.jpg"
          >
            {userName[1]?.toUpperCase() ?? ""}
          </Avatar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            {userName}
          </Typography>
          {userData && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={onOpenUpdateProfile}
            >
              Editar perfil
            </Button>
          )}
        </Box>
      </Container>
      {userData && (
        <EditProfileDialog
          isOpen={isUpdateProfileOpen}
          onClose={onCloseUpdateProfile}
          userData={userData}
        />
      )}
    </Box>
  );
}
