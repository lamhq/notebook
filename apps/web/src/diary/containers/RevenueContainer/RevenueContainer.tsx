import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';
import LoadingFallback from '../../atoms/LoadingFallback';
import Revenue from '../../components/Revenue/Revenue';
import { useRevenue } from '../../hooks';

function FetchRevenue() {
  const { income, outcome } = useRevenue();
  const [popoverAnchor, setPopoverAnchor] = useState<Element | undefined>();
  const popoverVisible = Boolean(popoverAnchor);
  const popoverId = popoverVisible ? 'revenue-popover' : undefined;
  const showPopover: MouseEventHandler = useCallback((event) => {
    setPopoverAnchor(event.currentTarget);
  }, []);
  const closePopover = useCallback(() => {
    setPopoverAnchor(undefined);
  }, []);

  return (
    <Revenue
      income={income}
      outcome={outcome}
      popoverId={popoverId}
      popoverVisible={popoverVisible}
      popoverAnchor={popoverAnchor}
      showPopover={showPopover}
      closePopover={closePopover}
    />
  );
}

export default function RevenueContainer() {
  return (
    <LoadingFallback style="empty">
      <FetchRevenue />
    </LoadingFallback>
  );
}
