import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from "../../pages/rank/rank.module.css";

interface RankData {
  id: number;         // Added `id` to match RankData with `id` field
  name: string;
  score: number;
  rank: number;
  rightAns: number;
  wrongAns: number;
};

// Define the columns for fullname, score, and rank
const columns: GridColDef[] = [
  { field: 'rank', headerName: 'Rank', width: 100 },
  { field: 'name', headerName: 'Full Name', width: 180, editable: false },
  { field: 'score', headerName: 'Score', width: 150, editable: false },
  { field: 'rightAns', headerName: 'Right Answers', width: 150, editable: false },
  { field: 'wrongAns', headerName: 'Wrong Answers', width: 150, editable: false }
];

const DataTable: React.FC<{ data: RankData[]}> = ({ data }) => {
  return (
    <Box sx={{ height: 531, width: '100%' }} className={styles.tableBox}>
      <DataGrid
        rows={data}
        columns={columns}
        rowHeight={70}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        disableRowSelectionOnClick // Disable row selection on click
        className={styles.gridBox}
      />
    </Box>
  );
};

export default DataTable;
