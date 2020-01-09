import { Component, OnInit } from '@angular/core';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { 
  }

  ngOnInit() {
  }

  /*
  onHighlightClicked(highlight: Highlight) {
    console.log('added new highlight: ', highlight)
    this.activeHlText = highlight.text;
    this.activeHlTime = this.formatTime(highlight.timeStart);
    this.cdr.detectChanges();
  }

  onAddHighlight() {
    // const currentTime = this.wave.getCurrentTime();
    // const duration = this.wave.getDuration();
    // const waveWidth = this.wave.drawer.width;
    // const highlightX = (currentTime / duration) * waveWidth;
    const nextId = this.highlights.length + 1;
    this.highlights.push({
      id: nextId,
      episodeId: 0,
      timeStart: 0,
      timeEnd: 0,
      text: `I am a new highlight. My highlight id is: ${nextId}`
    });
    this.cdr.detectChanges();
  }
  */

}
