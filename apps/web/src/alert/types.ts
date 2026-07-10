export interface AlertItem {
  type: 'success' | 'error' | 'warning';
  message: string;
  timestamp: number;
}

export interface AlertViewProps {
  items: (AlertItem & { remove: () => void })[];
}

export interface AlertHook {
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  showWarning: (msg: string) => void;
}
