import React, { useRef, useEffect } from "react";

type OutsideClickProps = {
  onOutsideClick: (event: MouseEvent) => void;
  useCapture?: boolean;
  disabled?: boolean;
};

export const OutsideClick: React.FC<OutsideClickProps> = ({
  onOutsideClick,
  useCapture = true,
  disabled = false,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    function onMouseUp(event: MouseEvent) {
      document.removeEventListener("mouseup", onMouseUp, { capture: useCapture });

      if (!ref.current) return;
      if (!event.target) return;

      const isDescendantOfRoot = ref.current.contains(event.target as Node);
      if (isDescendantOfRoot) return;

      onOutsideClick(event);
    }

    function onMouseDown(event: MouseEvent) {
      if (!ref.current) return;
      if (!event.target) return;

      const isDescendantOfRoot = ref.current.contains(event.target as Node);
      if (isDescendantOfRoot) return;

      document.addEventListener("mouseup", onMouseUp, { capture: useCapture });
    }

    document.addEventListener("mousedown", onMouseDown, { capture: useCapture });
    return () => {
      document.removeEventListener("mousedown", onMouseDown, { capture: useCapture });
    };
  }, [onOutsideClick, disabled, useCapture]);

  return <div ref={ref}>{children}</div>;
};
