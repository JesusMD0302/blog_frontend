import CommentsItem from "@/components/Comment/CommentsItem";
import { Box, Typography } from "@mui/material";

interface CommentsContainerProps {
  comments: {
    author: {
      username: string;
    };
    createdAt: string;
    content: string;
  }[];
}

export default function CommentsContainer({
  comments,
}: CommentsContainerProps) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        padding: 0,
        minWidth: { xs: "100%", md: "400px" },
      }}
    >
      {comments.length === 0 && (
        <Typography variant="body2" color="textSecondary" textAlign="center">
          No hay comentarios
        </Typography>
      )}
      {comments.map((comment, index) => (
        <li key={index} style={{ marginTop: 2 * 8 }}>
          <CommentsItem comment={comment} />
        </li>
      ))}
    </Box>
  );
}
