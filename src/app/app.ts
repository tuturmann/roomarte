import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { ArtService } from './services/art';
import { Subscription } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('roomarte');
  private artService = inject(ArtService);
  private sub?: Subscription;
  public artwork : any;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(){
  }

  chargerOeuvreById(id: number){
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.artService.getArtworkDetails(id).subscribe((data) => {
      this.artwork = data;
      this.cdr.detectChanges();
    });
  }

  onSearchById(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const texteSaisi = parseInt(inputElement.value);
    if (!isNaN(texteSaisi)){
      setTimeout(() => {
        this.chargerOeuvreById(texteSaisi);
      }, 300);
    }
  }
}
