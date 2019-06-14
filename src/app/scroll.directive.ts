import { Directive, ElementRef, OnInit } from '@angular/core';
import { UtilsService } from './utils.service';

/**
 * Directive that scrolls the page to the host DOM element
 * (the HTML element that includes this directive) when the
 * element is rendered.
 */
@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements OnInit {
  private readonly elementRef: ElementRef; // host DOM element

  // Inject a reference to the host DOM element, and store it in a variable
  constructor(element: ElementRef,
              private utilsService: UtilsService) {
    this.elementRef = element;
  }

  /**
   * When this directive is created, the page is scrolled to the host DOM element.
   */
  ngOnInit(): void {
    this.utilsService.scrollToElement(this.elementRef.nativeElement);
  }

}
