export type AlertItem = {
  type: 'success' | 'error' | 'warning';
  message: string;
  timestamp: number;
};

export type AlertViewProps = {
  items: (AlertItem & { remove: () => void })[];
};

export type AlertHook = {
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  showWarning: (msg: string) => void;
};
