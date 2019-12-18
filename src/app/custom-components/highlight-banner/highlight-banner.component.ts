import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Highlight } from '../../shared/highlight';

@Component({
  selector: 'app-highlight-banner',
  templateUrl: './highlight-banner.component.html',
  styleUrls: ['./highlight-banner.component.scss']
})
export class HighlightBannerComponent implements OnInit {
  @Input() highlights: Highlight[];
  @Output() highlightClicked: EventEmitter<Highlight> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    console.log(this.highlights)
  }

  onHighlightClick(highlight: Highlight) {
    this.highlightClicked.emit(highlight)
  }

}
