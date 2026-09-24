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
  public artwork : any = null;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(){
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  chargerOeuvreById(id: number){
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.artwork = null; 

    this.sub = this.artService.getArtworkDetails(id).subscribe({
      next: (data) => {
        // L'API renvoie parfois un objet vide ou une erreur encapsulée selon sa structure
        this.artwork = data && Object.keys(data).length > 0 ? data : null;
      },
      error: (err) => {
        // Si l'ID n'existe pas (Erreur 404), on force artwork à null pour afficher le @else
        console.error('Œuvre introuvable', err);
        this.artwork = null;
      }
    });
    
  }

  onSearchById(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const texteSaisi = parseInt(inputElement.value);
    if (!isNaN(texteSaisi)){
      setTimeout(() => {
        this.chargerOeuvreById(texteSaisi);
      }, 300);
    } else {
      this.artwork = null;
    }
  }
}
