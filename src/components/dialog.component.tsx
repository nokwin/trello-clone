"use client";

import { Transition, Dialog as DialogOriginal } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

interface DialogProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
}

export function Dialog({
  isOpen,
  closeModal,
  title,
  children,
}: PropsWithChildren<DialogProps>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <DialogOriginal as="div" className="relative" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogOriginal.Panel className="w-full text-white max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogOriginal.Title
                  as="h3"
                  className="text-3xl font-semibold leading-6 text-white mb-4"
                >
                  {title}
                </DialogOriginal.Title>
                {children}
              </DialogOriginal.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogOriginal>
    </Transition>
  );
}
