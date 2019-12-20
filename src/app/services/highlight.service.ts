import { Injectable } from '@angular/core';
import { Highlight } from '../shared/highlight';

@Injectable()
export class HighlightService {
    highlights: Highlight[] = [
        {
            id: 0,
            episodeId: 0,
            timeSeconds: 271,
            text: `"Finding the light in the darkness, learning to work with that stuff."`
        },
        {
            id: 1,
            episodeId: 0,
            timeSeconds: 823,
            text: `"ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices 
            vitae auctor eu augu ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem 
            dolor sed viverra ipsum nunc aliquet."`
        }
    ];

    getHighlights(): Highlight[] {
        return this.highlights;
    }
}