const DOCUMENT_NODE_TYPE = 9

type IterableType<T> = T & { [key: string]: any }

// 不同的手机浏览器下，matches 方法名不同
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto: IterableType<Element> = Element.prototype
  const matchesMethods: string[] = [
    'webkitMatchesSelector',
    'matchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
  ]

  matchesMethods.some((method: string): boolean => !!(proto.matches = proto[method]))
}

export const closest = (element: HTMLElement, selector: string): HTMLElement | undefined => {
  while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof element.matches === 'function' && element.matches(selector)) {
      return element
    }

    element = element.parentNode as HTMLElement
  }
}
