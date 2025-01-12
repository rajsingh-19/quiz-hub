import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

interface QuizCardProps {
    _id:  string,
    subjectName: string,
    imgUrl: string,
    description: string,
    handleInstruction: (_id: string) => void        // Function type for handling navigation
};

const QuizCard: React.FC<QuizCardProps> = ({ subjectName, imgUrl, description, handleInstruction, _id }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="300" image={imgUrl} alt="subject name image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{subjectName}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>
        </CardContent>
      <CardActions className="cardAction flex justify-center cursor-pointer" onClick={() => handleInstruction(_id)}>
        <Button className='font-wt-700' size="medium" color="primary">Play</Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
