import { useAtom, useSetAtom } from 'jotai';
import { alertAtom } from './atoms';
import type { AlertHook, AlertViewProps } from './types';

export function useAlert(): AlertHook {
  const setState = useSetAtom(alertAtom);
  const addSuccess = (msg: string) => {
    setState((alerts) => [
      { type: 'success', message: msg, timestamp: Date.now() },
      ...alerts,
    ]);
  };
  const addError = (msg: string) => {
    setState((alerts) => [
      { type: 'error', message: msg, timestamp: Date.now() },
      ...alerts,
    ]);
  };
  const addWarning = (msg: string) => {
    setState((alerts) => [
      { type: 'warning', message: msg, timestamp: Date.now() },
      ...alerts,
    ]);
  };
  return {
    showSuccess: addSuccess,
    showError: addError,
    showWarning: addWarning,
  };
}

export function useAlertProps(): AlertViewProps {
  const [alerts, setAlerts] = useAtom(alertAtom);
  const items = alerts.map((item) => {
    const remove = () => {
      setAlerts(alerts.filter((alert) => alert !== item));
    };
    return {
      ...item,
      remove,
    };
  });
  return { items };
}
