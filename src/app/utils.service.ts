import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Scrolls the page to the given HTML element.
   * @param element: Element where the page will be scrolled
   */
  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

}
