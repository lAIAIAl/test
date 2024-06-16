import { closest } from './closest'
import { EventDistroyObject } from './index'

export interface CompositeEvent extends Event {
  selector?: string;
  delegateTarget?: HTMLElement;
}

const listener = (
  element: HTMLElement,
  selector: string | string[],
  callback: (evt: CompositeEvent) => void,
): (evt: CompositeEvent) => void => {
  return (evt: CompositeEvent): void => {
    if (Array.isArray(selector)) {
      selector.forEach((s): void => {
        evt.delegateTarget = closest(evt.target as HTMLElement, s)
        evt.selector = s

        if (evt.delegateTarget) {
          callback.call(element, evt)
        }
      })
    } else {
      evt.delegateTarget = closest(evt.target as HTMLElement, selector)
      evt.selector = selector

      if (evt.delegateTarget) {
        callback.call(element, evt)
      }
    }
  }
}

const bind = (
  element: HTMLElement,
  selector: string | string[],
  type: string,
  callback: (evt: CompositeEvent) => void,
  useCapture?: boolean,
): EventDistroyObject => {
  const listenerFn: (evt: CompositeEvent) => void = listener(element, selector, callback)

  element.addEventListener(type, listenerFn, useCapture)

  return {
    destroy: (): void => {
      element.removeEventListener(type, listenerFn, useCapture)
    },
  }
}

export function delegate(
  elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  seletor: string | string[],
  type: string,
  callback: (evt: CompositeEvent) => void,
  useCapture?: boolean,
): EventDistroyObject[] {
  if (elements instanceof HTMLElement) {
    elements = [elements]
  }

  // 需要考虑 elements 是 NodeList 类型的情况
  return Array.from(elements).map((element): EventDistroyObject => {
    return bind(element, seletor, type, callback, useCapture)
  })
}
