import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';

export type RevenueProps = {
  income: number;
  outcome: number;
  popupId?: string;
  isPopupVisible: boolean;
  popupAnchor?: Element;
  showDetails: MouseEventHandler;
  closeDetails: () => void;
};

export default function useRevenueProps() {
  const [anchor, setAnchor] = useState<Element | undefined>();
  const isPopupVisible = Boolean(anchor);
  const popupId = isPopupVisible ? 'revenue-popover' : undefined;

  const showDetails: MouseEventHandler = useCallback((event) => {
    setAnchor(event.currentTarget);
  }, []);
  const closeDetails = useCallback(() => {
    setAnchor(undefined);
  }, []);

  return {
    popupId,
    isPopupVisible,
    popupAnchor: anchor,
    showDetails,
    closeDetails,
  };
}
