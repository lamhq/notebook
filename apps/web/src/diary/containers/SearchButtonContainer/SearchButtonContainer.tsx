import { useState } from 'react';
import SearchButton from '../../components/SearchButton/SearchButton';
import SearchDialog from '../../components/SearchDialog/SearchDialog';
import { useActivityFilter } from '../../hooks';
import type { ActivityFilter } from '../../types';

export default function SearchButtonContainer() {
  const { filter, updateFilter } = useActivityFilter();
  const [isDialogOpen, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSearch = (data: ActivityFilter) => {
    updateFilter({ ...data, page: 1 });
    setOpen(false);
  };

  return (
    <>
      <SearchButton onClick={handleOpenDialog} />
      <SearchDialog
        open={isDialogOpen}
        onCancel={handleCloseDialog}
        defaultFormValues={filter}
        onSubmit={handleSearch}
      />
    </>
  );
}
