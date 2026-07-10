import { useNavigate } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import AddActivityForm, {
  type AddActivityFormData,
} from '../../containers/AddActivityForm';
import { useAddActivity } from '../../hooks';

const defaultValues: AddActivityFormData = {
  content: '',
  tags: [],
  time: new Date(),
  splitByTag: false,
};

export default function AddActivityPage() {
  const addActivity = useAddActivity();
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const handleSubmit = async (data: AddActivityFormData) => {
    try {
      await addActivity(data);
      void navigate('/');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Title>Add Activity</Title>
      <AddActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  );
}
