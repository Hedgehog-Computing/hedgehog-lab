import { useEffect, useRef } from 'react';

import { SnackbarKey, useSnackbar } from 'notistack';

import useNotifications from '@/store/notifications';

// NOTE: this is a workaround for a missing feature in notistack
// This will be removed once the new version of notistack is released
// But it works great for now :)
function Notifier() {
  const [notifications, actions] = useNotifications();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayed = useRef<SnackbarKey[]>([]);

  function storeDisplayed(key: SnackbarKey) {
    displayed.current = [...displayed.current, key];
  }

  function removeDisplayed(key: SnackbarKey) {
    displayed.current = [...displayed.current.filter((_key) => key !== _key)];
  }

  useEffect(() => {
    notifications.forEach(({ message, options, dismissed }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(options.key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (options.key && displayed.current.includes(options.key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        ...options,
        onExited(event, key) {
          // removen this snackbar from the store
          actions.remove(key);
          removeDisplayed(key);
        },
      });

      // keep track of snackbars that we've displayed
      options.key && storeDisplayed(options.key);
    });
  });

  return null;
}

export default Notifier;
