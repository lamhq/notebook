import LoadingFallback from '../../atoms/LoadingFallback';
import Revenue from '../../components/Revenue/Revenue';
import { useRevenue } from '../../hooks';

function FetchRevenue() {
  const { income, outcome } = useRevenue();
  return <Revenue income={income} outcome={outcome} />;
}

export default function RevenueContainer() {
  return (
    <LoadingFallback style="empty">
      <FetchRevenue />
    </LoadingFallback>
  );
}
