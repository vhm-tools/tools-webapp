import { ReactNode, forwardRef } from 'react';

interface Props {
  children?: ReactNode;
  type: 'submit' | 'button';
}
export type Ref = HTMLDivElement;

export const useModal = forwardRef<Ref, Props>((props, ref) => {
  const openModal = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const closeModal = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  return { openModal, closeModal };
});
