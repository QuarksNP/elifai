"use client";

import { createPortal } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";
import { cn } from "../lib/cn";
import { Icon } from "./ui/icon";

interface FloatingButtonProps extends ButtonProps {
  portal?: boolean;
}

export const FloatingButton = ({
  onClick,
  portal = true,
  className,
  type = "button",
  children,
  ...props
}: FloatingButtonProps) => {
  if (!portal)
    return (
      <Button 
        {...props} 
        onClick={onClick} 
        className={cn("rounded-full h-14 w-14 shadow-2xl", className)} 
        type={type}>
        <Icon name="Plus" 
      />
        {children}
      </Button>
    );

  return (
    <>
      {createPortal(
        <Button
          {...props}
          onClick={onClick}
          className={cn(
            "fixed right-4 bottom-4 rounded-full h-14 w-14 shadow-2xl md:right-8 md:bottom-8",
            className
          )}
          type={type}
        >
          <Icon name="Plus" />
          {children}
        </Button>,
        document.body
      )}
    </>
  );
};
