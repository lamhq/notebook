import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';

export type SearchButtonProps = {
  onClick: () => void;
};

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <IconButton color="default" size="small" onClick={onClick}>
      <FilterListIcon />
    </IconButton>
  );
}
