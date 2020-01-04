import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Highlight } from '../../shared/highlight';

@Component({
  selector: 'app-highlight-popover',
  templateUrl: './highlight-popover.component.html',
  styleUrls: ['./highlight-popover.component.scss']
})
export class HighlightPopoverComponent implements OnInit {
  @Input() highlights: Highlight[];
  @Output() highlightClicked: EventEmitter<Highlight> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    // console.log(this.highlights)
  }

  onHighlightClick(highlight: Highlight) {
    this.highlightClicked.emit(highlight)
  }

}
