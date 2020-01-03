import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import WaveSurfer from 'wavesurfer.js';
import { waveConfig } from './constants/wave-config';

import { Highlight } from '../../shared/highlight';
import { HighlightService } from '../../services/highlight.service';

import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';
import { chartConfig } from './constants/chart-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wave: WaveSurfer;
  chart: any;
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
    this.wave = WaveSurfer.create(waveConfig);

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
      this.cdr.detectChanges();

      this.createChart();

      this.cdr.detectChanges();
    });

    // Update play/pause button
    this.wave.on('finish', () => {
      this.cdr.detectChanges();
    });

    // Update counter every second
    this.wave.on('audioprocess', () => {
      this.counter = this.formatTime(this.wave.getCurrentTime());
      this.cdr.detectChanges();
    });

    // Update counter on seek
    this.wave.on('seek', () => {
      this.counter = this.formatTime(this.wave.getCurrentTime());
      this.cdr.detectChanges();
    });

    this.wave.load('assets/mp3/akshay_nanavati.mp3');
  }

  createChart() {
    let ctx = document.getElementById('myChart') as HTMLCanvasElement;
    ctx.parentElement.style.height = '50px';

    // Todo: pass into chart config as argument
    // let dur = this.wave.getDuration();

    this.chart = new Chart(ctx.getContext('2d'), chartConfig)
  }

  onResetZoom() {
    this.chart.resetZoom();
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
