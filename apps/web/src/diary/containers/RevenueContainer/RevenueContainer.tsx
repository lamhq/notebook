import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import SuspenseWrapper from '../../../common/components/SuspenseWrapper';
import Revenue from '../../components/Revenue/Revenue';
import { useRevenue } from '../../hooks';

function FetchRevenue() {
  const { income, outcome } = useRevenue();
  const [popoverAnchor, setPopoverAnchor] = useState<Element | undefined>();
  const popoverVisible = Boolean(popoverAnchor);
  const popoverId = popoverVisible ? 'revenue-popover' : undefined;
  const showPopover: MouseEventHandler = (event) => {
    setPopoverAnchor(event.currentTarget);
  };
  const closePopover = () => {
    setPopoverAnchor(undefined);
  };

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
    <SuspenseWrapper style="empty">
      <FetchRevenue />
    </SuspenseWrapper>
  );
}
