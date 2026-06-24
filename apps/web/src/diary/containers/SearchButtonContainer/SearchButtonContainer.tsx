import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import SearchButton from '../../components/SearchButton/SearchButton';
import SearchDialog from '../../components/SearchDialog/SearchDialog';
import { useActivityFilter } from '../../hooks';
import type { ActivityFilter } from '../../types';

function useSearchButtonContainer() {
  const { filter, updateFilter } = useActivityFilter();
  const [isDialogOpen, setOpen] = useState(false);
  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const handleSearch = useCallback<SubmitHandler<ActivityFilter>>(
    (data) => {
      updateFilter({ ...data, page: 1 });
      setOpen(false);
    },
    [updateFilter],
  );
  return {
    filter,
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleSearch,
  };
}

export default function SearchButtonContainer() {
  const { filter, isDialogOpen, handleOpenDialog, handleCloseDialog, handleSearch } =
    useSearchButtonContainer();

  return (
    <>
      <SearchButton onClick={handleOpenDialog} />
      <SearchDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        defaultFormValues={filter}
        onSubmit={handleSearch}
      />
    </>
  );
}
