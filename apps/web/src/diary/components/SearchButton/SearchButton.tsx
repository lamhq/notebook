import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';

export interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <IconButton
      color="default"
      size="small"
      onClick={onClick}
      title="Search Activities"
    >
      <FilterListIcon />
    </IconButton>
  );
}
