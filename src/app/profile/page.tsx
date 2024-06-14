"use client";

import PostCard from "@/components/Post/PostCard";
import PostsContainer from "@/components/Post/PostsContainer";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { Box, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data } = useSession();
  const axios = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!data?.user) return;

      try {
        const res = await axios.get(`/posts/all/${(data?.user as any)!.id}`);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box component="main">
      <ProfileHeader />
      <Container maxWidth="sm" sx={{ pb: 2 }}>
        <PostsContainer>
          {posts &&
            posts.map((post, index) => (
              <PostCard key={index} {...post} isEditable />
            ))}

          {posts.length === 0 && (
            <Box
              component="section"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "50vh" }}
            >
              <Typography variant="h6" align="center">
                No tienes publicaciones
              </Typography>
            </Box>
          )}
        </PostsContainer>
      </Container>
    </Box>
  );
}
