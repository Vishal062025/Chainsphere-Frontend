// components/ui/dialog.jsx
'use client';

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Dialog({ children, ...props }) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

const DialogTrigger = ({ children, ...props }) => (
  <DialogPrimitive.Trigger asChild {...props}>
    {children}
  </DialogPrimitive.Trigger>
);

const DialogPortal = ({ children }) => (
  <DialogPrimitive.Portal>
    {children}
  </DialogPrimitive.Portal>
);

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-200",
      className
    )}
    {...props}
  />
));

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg outline-none",
        "dark:bg-neutral-900",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));

const DialogHeader = ({ children, className }) => (
  <div className={cn("mb-4 flex justify-between items-center", className)}>
    {children}
  </div>
);

const DialogTitle = ({ children, className }) => (
  <DialogPrimitive.Title className={cn("text-lg font-semibold", className)}>
    {children}
  </DialogPrimitive.Title>
);

const DialogDescription = ({ children, className }) => (
  <DialogPrimitive.Description className={cn("text-sm text-gray-500", className)}>
    {children}
  </DialogPrimitive.Description>
);

const DialogClose = ({ className, ...props }) => (
  <DialogPrimitive.Close
    className={cn("absolute right-4 top-4  text-gradient-to-r from-[#FFC000] to-[#FF9500] shadow-xs hover:text-primary/90", className)}
    {...props}
  >
    <X className="w-5 h-5 text-gradient-to-r from-[#FFC000] to-[#FF9500]" />
  </DialogPrimitive.Close>
);

// Export all subcomponents
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;

export { Dialog };
