import MuiPagination, { type PaginationProps } from '@mui/material/Pagination';

export type { PaginationProps } from '@mui/material/Pagination';

export default function Pagination(props: PaginationProps) {
  return (
    <MuiPagination
      siblingCount={0}
      boundaryCount={2}
      variant="outlined"
      shape="rounded"
      size="small"
      sx={{
        '& .MuiButtonBase-root': {
          backgroundColor: 'background.paper',
        },
        '& .Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      }}
      {...props}
    />
  );
}
