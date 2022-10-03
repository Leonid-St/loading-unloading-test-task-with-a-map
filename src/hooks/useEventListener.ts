import { useEffect, useLayoutEffect, useRef } from 'react';

type WindowEventType = keyof WindowEventMap;
type HTMLElementEventType = keyof HTMLElementEventMap;
type ElementType = HTMLElement | Document;

export function useEventListener<WE extends WindowEventType, HE extends HTMLElementEventType, T extends ElementType>(
  eventName: WE | HE,
  handler: (event: WindowEventMap[WE] | HTMLElementEventMap[HE] | Event) => void,
  element?: T | null
) {
  const savedHandler = useRef(handler);

  useLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }
    const eventListener: typeof handler = (event) => savedHandler.current(event);
    targetElement.addEventListener(eventName, eventListener);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
