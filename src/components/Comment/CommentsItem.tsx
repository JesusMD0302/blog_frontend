import { Avatar, Card, CardContent, CardHeader } from "@mui/material";

interface CommentsItemProps {
  comment: {
    author: {
      username: string;
    };
    createdAt: string;
    content: string;
  };
}

export default function CommentsItem({ comment }: CommentsItemProps) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {comment.author.username.replace("@", "")[0].toUpperCase()}
          </Avatar>
        }
        title={comment.author.username}
        subheader={new Date(comment.createdAt).toLocaleString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      />
      <CardContent>{comment.content}</CardContent>
    </Card>
  );
}
