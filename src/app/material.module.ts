import { NgModule } from "@angular/core";
import { 
    MatToolbarModule, 
    MatIconModule 
} from "@angular/material";

@NgModule({
    imports: [
        MatIconModule,
        MatToolbarModule,
    ],
    exports: [
        MatIconModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}
