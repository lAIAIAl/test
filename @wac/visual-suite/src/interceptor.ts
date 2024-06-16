import { EventCancelObject } from './index'

export type ConstituteCallback = (element: HTMLElement, constituted: boolean) => void

export class Interceptor {
  private constitutedElements: HTMLElement[] = []

  private cancelHighlightedEvent: EventCancelObject = {
    cancel: () => {}
  }

  public break(element: HTMLElement, type: string, callback?: (evt: Event) => void): void {
    const fn = (evt: Event): void => {
      if (callback) {
        callback(evt)
      }

      evt.preventDefault()
      evt.stopPropagation()
    }

    element.addEventListener(type, fn, true)
  }

  public constitute(element: HTMLElement, allowMulti: boolean, callback?: ConstituteCallback): void {
    const constituted = element.classList.toggle('c-vs-constitute')

    this.repair(element, constituted, allowMulti)

    if (callback && typeof callback === 'function') {
      callback(element, constituted)
    }
  }

  // 圈选逻辑
  public constituteAuto(allowMulti: boolean, callback?: ConstituteCallback): void {
    return this.break(document.body, 'click', (evt: Event): void => {
      // 忽略 body 圈选
      if (evt.target && evt.target !== evt.currentTarget) {
        const constitutedElement = evt.target as HTMLElement

        this.constitute(constitutedElement, allowMulti, callback)
      }
    })
  }

  // 高亮元素
  public highlight(
    selectors: string | string[],
  ): EventCancelObject {
    if (typeof selectors === 'string') {
      selectors = [selectors]
    }

    let highlightedElements: Element[] = []

    selectors.forEach((selector) => {
      highlightedElements = highlightedElements.concat(Array.from(window.document.querySelectorAll(selector)))
    })

    this.constitutedElements.forEach((constitutedElement) => {
      constitutedElement.classList.remove('c-vs-constitute')
    })

    this.constitutedElements = []

    highlightedElements.forEach((element): void => {
      element.classList.add('c-vs-highlight')
    })

    this.cancelHighlightedEvent = {
      // 取消高亮
      cancel: (): void => {
        highlightedElements.forEach((element): void => {
          element.classList.remove('c-vs-highlight')
        })
      },
    }

    return this.cancelHighlightedEvent
  }

  private repair(element: HTMLElement, constituted: boolean, allowMulti: boolean): void {
    // 新增圈选元素
    if (constituted) {
      this.cancelHighlightedEvent.cancel()

      if (allowMulti) {
        element.classList.toggle('c-vs-constitute')
        this.constitutedElements.push(element)
      } else {
        // 清除存量被圈选的元素再添加并从圈选记录中移除
        this.constitutedElements.forEach((constitutedElement): void => {
          constitutedElement.classList.toggle('c-vs-constitute')
        })
        this.constitutedElements.splice(0, this.constitutedElements.length, element)
      }
    } else {
      // 取消某个元素的圈选
      this.constitutedElements = this.constitutedElements.filter((constitutedElement: HTMLElement): boolean => {
        return constitutedElement !== element;
      })
    }
  }
}
