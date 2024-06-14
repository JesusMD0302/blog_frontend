"use client";

/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  Typography,
  useTheme,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useToggle } from "@/hooks/useToggle";
import NewPostDialog from "@/components/Post/PostFormDialog";
import PostsContainer from "@/components/Post/PostsContainer";
import PostCard from "@/components/Post/PostCard";
import { useSession } from "next-auth/react";
import useApi from "@/hooks/useApi";

export default function Home() {
  const [newPostOpen, _, setNewPostClose, setNewPostOpen] = useToggle();
  const theme = useTheme();
  const { data } = useSession();
  const { data: posts, error, loading } = useApi<Post[]>("/posts/all");

  return (
    <Box component="main">
      <Container maxWidth="sm" sx={{ pb: 2 }}>
        <Box
          component="section"
          display={{ xs: "none", sm: "flex" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
          mt={2}
          gap={1}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            Publicaciones
          </Typography>
          {data && (
            <Button
              variant="contained"
              color="primary"
              onClick={setNewPostOpen}
            >
              Nueva publicación
            </Button>
          )}
        </Box>

        <PostsContainer>
          {posts &&
            posts.map((post, index) => <PostCard key={index} {...post} />)}
        </PostsContainer>
      </Container>

      {data && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={setNewPostOpen}
        >
          <AddIcon />
        </Fab>
      )}

      <NewPostDialog isOpen={newPostOpen} handleClose={setNewPostClose} />
    </Box>
  );
}
