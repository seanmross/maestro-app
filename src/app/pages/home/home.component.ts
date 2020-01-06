import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import WaveSurfer from 'wavesurfer.js';
import { WaveConfig } from './constants/wave-config';
import { Highlight } from '../../shared/highlight';
import { HighlightService } from '../../services/highlight.service';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';
import { ChartConfig } from './constants/chart-config';

const waveData = [
  {
    start: 12,
    end: 12.25,
    loop: false,
    color: 'hsla(200, 50%, 70%, 0.4)'
  },
  {
    start: 24,
    end: 24.25,
    loop: false,
    color: 'hsla(200, 50%, 70%, 0.4)'
  },
  {
    start: 72,
    end: 72.25,
    loop: false,
    color: 'hsla(200, 50%, 70%, 0.4)'
  }
];

const chartData = [
  {
    x: 12,
    y: 1
  },
  {
    x: 24,
    y: 1
  },
  {
    x: 72,
    y: 1
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wave: WaveSurfer;
  chart: any; // Use type 'any' because method .resetZoom() doesn't exist on type 'Chart'
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
    let wave = new WaveConfig(waveData);
    this.wave = WaveSurfer.create(wave.config);

    /**
     * Manually detect changes using cdr
     * Angular won't update property bindings from waveform events
     */
    this.wave.on('ready', () => {
      this.waveReady = true;
      this.wave.setHeight(160);

      this.duration = this.getDuration();
      this.counter = '0:00';
      
      this.highlights = this.hlService.getHighlights();
      
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
    let canvas = document.getElementById('myChart') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');

    // Todo: create gradient
    // let gradient = ctx.createLinearGradient(0, 0, 0, 200);
    // gradient.addColorStop(0, "white");
    // gradient.addColorStop(1, "green");

    // Get episode duration
    let dur = this.wave.getDuration();

    // Build chart
    let chart = new ChartConfig(dur, chartData);
    this.chart = new Chart(ctx, chart.config);
  }

  onResetChartZoom() {
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
