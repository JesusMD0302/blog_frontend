import { Box } from "@mui/material";

interface PostsContainerProps {
  children?: React.ReactNode;
}

export default function PostsContainer({ children }: PostsContainerProps) {
  return (
    <Box
      component="section"
      display="grid"
      gridTemplateColumns="repeat(1, 1fr)"
      gap={1}
    >
      {children}
    </Box>
  );
}
