import { Component, OnInit, ChangeDetectorRef, Renderer, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import { Highlight } from '../../shared/highlight';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wave: WaveSurfer;
  waveReady = false;
  duration: string;
  counter: string;
  activeHlText: string;
  activeHlTime: string;

  highlights: Highlight[];

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private hlService: HighlightService
  ) { }

  ngOnInit() {
    this.wave = WaveSurfer.create({
      container: '#waveform',
      progressColor: '#57a260',
      waveColor: '#8e8e8e',
      cursorColor: '#ec407a',
      cursorWidth: 2,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      responsive: true,
      height: 0,
      scrollParent: true,
      // autoCenterRate: 10,
      plugins: [
        CursorPlugin.create({
          container: '#waveform',
          opacity: 1,
          /**
           * hide cursor time until wavesurfer v3.3.0 release
           * github issue #1802
           */
          // showTime: true,
          // followCursorY: true,
          // customShowTimeStyle: {
          //   'background-color': '#000',
          //   'color': '#fff',
          //   'font-size': '12px',
          //   'padding': '0.25em 0.5em'
          // },
          // formatTimeCallback: (sec: number) => {
          //   return this.formatCursorTime(sec);
          // }
        }),
        MinimapPlugin.create({
          container: '#wave-minimap',
          progressColor: '#57a260',
          waveColor: '#8e8e8e',
          cursorWidth: 2,
          barWidth: 1,
          barRadius: 1,
          barGap: 0.5,
          height: 50,
        }),
        RegionsPlugin.create({
          regions: [
            {
              start: 271,
              end: 275,
              loop: false,
              color: 'hsla(200, 50%, 70%, 0.4)'
            }
          ],
        })
      ],
    });

    /**
     * Manually detect changes using cdr
     * Angular won't update property bindings from waveform events
     */
    this.wave.on('ready', () => {
      this.waveReady = true;
      this.wave.setHeight(200);
      this.duration = this.getDuration();
      this.counter = '0:00';
      this.highlights = this.hlService.getHighlights();

      this.addDivToWave()

      this.cdr.detectChanges();
    });

    // Update play/pause button
    this.wave.on('finish', () => {
      this.cdr.detectChanges();
    });

    this.wave.on('audioprocess', () => {
      this.counter = this.formatTime(this.wave.getCurrentTime());
      this.cdr.detectChanges();
    });

    this.wave.on('seek', () => {
      console.log(this.wave.getCurrentTime())
      this.counter = this.formatTime(this.wave.getCurrentTime());
      this.cdr.detectChanges();
    });

    this.wave.load('assets/mp3/akshay_nanavati.mp3');
  }

  addDivToWave() {
    let div = document.createElement('div');
    div.innerHTML = 'highlight';
    div.setAttribute('position', 'absolute');
    div.setAttribute('left', '61px');
    div.setAttribute('top', '2px');
    document.getElementById('waveform').appendChild(div);

  }

  onHighlightClicked(highlight: Highlight) {
    console.log('added new highlight: ', highlight)
    this.activeHlText = highlight.text;
    this.activeHlTime = this.formatTime(highlight.timeSeconds);
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
      timeSeconds: 0,
      text: `I am a new highlight. My highlight id is: ${nextId}`
    });
    this.cdr.detectChanges();
  }

  formatTime(sec: number): string {
    /**
     * m:ss or h:mm:ss
     * e.g. 6:13, 1:06:13
     */

    let time = [];
    let h = sec > 3600 ? Math.floor(sec / 3600) : null;
    let m = Math.floor((sec % 3600) / 60);
    if (h) {
      time.push(h);
      let mm = ('00' + Math.floor((sec % 3600) / 60)).slice(-2);
      time.push(mm);
    } else {
      time.push(m);
    }
    let ss = ('00' + Math.floor(sec % 60)).slice(-2);
    time.push(ss);
    return time.join(':');
  }

  getDuration(): string {
    return this.formatTime(this.wave.getDuration());
  }

  onPlayPause() {
    this.wave.playPause();
  }

  onForward() {
    this.wave.skip(5);
  }

  onReplay() {
    this.wave.skip(-5);
  }

  isPlaying(): boolean {
    return this.wave.isPlaying();
  }

}
