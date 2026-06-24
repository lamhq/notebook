import AlertView from '../../components/AlertView/AlertView';
import { useAlertProps } from '../../hooks';

export default function AlertContainer() {
  const { items } = useAlertProps();
  return <AlertView items={items} />;
}
