import { Injectable } from '@angular/core';
import { Highlight } from '../shared/highlight';

@Injectable()
export class HighlightService {
    highlights: Highlight[] = [
        {
            id: 0,
            episodeId: 0,
            timeStart: 12,
            timeEnd: 15,
            text: `"id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit."`
        },
        {
            id: 1,
            episodeId: 0,
            timeStart: 24,
            timeEnd: 30,
            text: `"ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices 
            vitae auctor eu augu ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem 
            dolor sed viverra ipsum nunc aliquet."`
        },
        {
            id: 2,
            episodeId: 0,
            timeStart: 36,
            timeEnd: 40,
            text: `"sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci 
            dapibus ultrices in."`
        }
    ];

    getHighlights(episodeId: number): Highlight[] {
        return this.highlights.filter( hl => hl.episodeId == episodeId);
    }
}
