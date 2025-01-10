import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

interface Category {
    subjectName: string,
    imgUrl: string,
    description: string
};

const QuizCard: React.FC<Category> = ({ subjectName, imgUrl, description }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="300" image={imgUrl} alt="subject name image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{subjectName}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">Play</Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
