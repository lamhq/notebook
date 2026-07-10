import { useState } from 'react';
import SearchButton from '../../components/SearchButton/SearchButton';
import SearchDialog from '../../components/SearchDialog/SearchDialog';
import { useActivityQuery } from '../../hooks';
import type { SearchActivityFormData } from '../SearchActivityForm/SearchActivityForm';

export default function SearchButtonContainer() {
  const { query, updateQuery } = useActivityQuery();
  const [isDialogOpen, setOpen] = useState(false);
  const defaultFormValues: SearchActivityFormData = {
    text: query.text,
    tags: query.tags,
    timeRange: query.timeRange,
    from: query.from,
    to: query.to,
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSearch = (data: SearchActivityFormData) => {
    updateQuery({ ...query, ...data });
    setOpen(false);
  };

  return (
    <>
      <SearchButton onClick={handleOpenDialog} />
      <SearchDialog
        open={isDialogOpen}
        onCancel={handleCloseDialog}
        defaultFormValues={defaultFormValues}
        onSubmit={handleSearch}
      />
    </>
  );
}
