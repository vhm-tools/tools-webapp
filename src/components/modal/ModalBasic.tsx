import { ReactNode, forwardRef } from 'react';

type Props = {
  title: string;
  description: string;
  buttons?: ReactNode;
};

export type Ref = HTMLDialogElement;

export const ModalBasic = forwardRef<Ref, Props>(
  ({ title, description, buttons }, ref) => {
    return (
      <>
        <dialog ref={ref} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{description}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                {buttons || <button className="btn">Close</button>}
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  },
);
