import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface CustomBtnProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
};

const CustomBtn: React.FC<CustomBtnProps> = ({ onClick, className, label, type }) =>  {
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={onClick} type={type} className={className} variant="contained">{label}</Button>
    </Stack>
  );
};

export default CustomBtn;
