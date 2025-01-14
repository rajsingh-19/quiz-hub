import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

interface PieData {
  label: string;
  value: number;
}

const ansData: PieData[] = [
  {
    label: 'Right',
    value: 70,
  },
  {
    label: 'Wrong',
    value: 30,
  },
];

const valueFormatter = (item: { value: number }): string => `${item.value}%`;

const PieAnimation: React.FC = () => {
  const radius = 90; // Fixed radius value

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
