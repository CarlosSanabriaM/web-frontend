import { Directive, ElementRef, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

/**
 * Directive that scrolls the page to the host DOM element
 * (the HTML element that includes this directive) when the element is rendered.
 */
@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements OnInit {

  /** Host DOM element */
  private readonly elementRef: ElementRef;

  /**
   * Injects a reference to the host DOM element, and stores it in a variable.
   * @param element Reference to the host DOM element.
   */
  constructor(element: ElementRef) {
    this.elementRef = element;
  }

  /**
   * When this directive is created, the page is scrolled to the host DOM element.
   */
  ngOnInit(): void {
    UtilsService.scrollToElement(this.elementRef.nativeElement);
  }

}
