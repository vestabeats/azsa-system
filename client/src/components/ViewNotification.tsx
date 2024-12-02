import React from 'react';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Button from './Button';

interface Notice {
  title: string;
}

interface Notification {
  notice?: Notice;
  text?: string;
}

interface ViewNotificationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  el?: Notification | any;
}

const ViewNotification: React.FC<ViewNotificationProps> = ({ open, setOpen, el }) => {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <Dialog.Title as="h3" className="font-semibold text-lg">
          {el?.notice?.title}
        </Dialog.Title>
        <p className="text-start text-gray-500">{el?.text}</p>
        <Button
          type="button"
          label="Ok"
          className="bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border"
          onClick={() => setOpen(false)}
        />
      </div>
    </ModalWrapper>
  );
};

export default ViewNotification;
