import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

// Interface to define the structure of each pie slice data
interface PieData {
  label: string;
  value: number;
};

// Props interface for the PieAnimation component
interface PieAnimationProps {
  right: number; // Percentage of correct answers
  wrong: number; // Percentage of incorrect answers
};

// A function to format the value in the pie chart to display as a percentage
const valueFormatter = (item: { value: number }): string => `${item.value}%`;

// The PieAnimation component that receives `right` and `wrong` percentages as props
const PieAnimation: React.FC<PieAnimationProps> = ({ right, wrong }) => {
  const radius = 90; // Fixed radius value

  // Creating pie data dynamically based on props
  const ansData: PieData[] = [
    {
      label: 'Right',
      value: right,
    },
    {
      label: 'Wrong',
      value: wrong,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={300}
        series={[
          {
            data: ansData,
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
            valueFormatter,
          },
        ]}
      />
    </Box>
  );
};

export default PieAnimation;
