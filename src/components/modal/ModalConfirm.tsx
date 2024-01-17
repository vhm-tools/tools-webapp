import { forwardRef, Ref, RefObject } from 'react';
import cn from 'classnames';

type Props = {
  title: string;
  description: string;
  extraBtnConfirm?: string;
  btnConfirmText?: string;
  btnCancelText?: string;
  onConfirm?: () => Promise<any> | void;
  onClose?: () => void;
};

export const ModalConfirm = forwardRef(
  (
    {
      title,
      description,
      btnConfirmText,
      extraBtnConfirm,
      btnCancelText,
      onConfirm,
      onClose,
    }: Props,
    ref: Ref<HTMLDialogElement>,
  ) => {
    const handleClose = () => {
      if (ref) {
        (ref as RefObject<HTMLDialogElement>).current?.close();
      }

      onClose?.();
    };

    const handleConfirm = () => {
      if (ref) {
        (ref as RefObject<HTMLDialogElement>).current?.close();
      }

      onConfirm?.();
    };

    return (
      <>
        <dialog ref={ref} className="modal">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{description}</p>
            <div className="modal-action">
              <button className="btn" onClick={handleClose}>
                {btnCancelText || 'Cancel'}
              </button>
              <button
                className={cn('btn btn-primary', extraBtnConfirm)}
                onClick={handleConfirm}
              >
                {btnConfirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  },
);
