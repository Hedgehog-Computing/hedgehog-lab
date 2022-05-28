import type { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

interface Notification {
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed: boolean;
}

type Actions = {
  push: (notification: Partial<Notification>) => SnackbarKey;
  close: (key: SnackbarKey, dismissAll?: boolean) => void;
  remove: (key: SnackbarKey) => void;
};

export type { Notification, Actions };
