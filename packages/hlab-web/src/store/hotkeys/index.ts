import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';

const hotKeysDialogState = atom<boolean>({
  key: 'hotkeys-dialog-state',
  default: false,
});

function useHotKeysDialog(): [boolean, Actions] {
  const [isOpen, setIsOpen] = useRecoilState(hotKeysDialogState);

  function toggle() {
    setIsOpen((isOpen: boolean) => !isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return [isOpen, { toggle, close, open }];
}

export default useHotKeysDialog;
