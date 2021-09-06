import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Voiture } from '../modele/voiture';
import { VoitureService } from '../service/voiture.service';
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss']
})
export class VoitureComponent implements OnInit {

  voiture:Voiture;
  voitures:Voiture[];
  affichageVoitureForm = false;
  voitureForm: FormGroup;
  submitted = false;
  affichageModifierVoitureForm = false;
  faTrash = faTrash;
  faEdit = faEdit;
  

  constructor(
    private voitureService: VoitureService,
    private formBuilder: FormBuilder
    ) { }



  ngOnInit() {
    this.recupererListeVoitures()
    this.createForm();
    registerLocaleData( fr );
  }


  private createForm(){
    this.voitureForm = this.formBuilder.group({
      nom:[null, Validators.required],
      kilometrage:[null, Validators.required],
      immatriculation:[null, Validators.required],
    })
  }

  afficherForm() {
    this.voitureForm.reset();
    this.affichageVoitureForm = true;
    this.affichageModifierVoitureForm = false;
  }

  enregistrer(){
    this.affichageVoitureForm = false;
    this.onSubmit();
  }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.voitureForm.invalid) {
      console.log('formulaire incomplet')
      return;
    }

    // display form values on success  
    const voiture: Voiture = this.voitureForm.getRawValue()
    this.voitureService.postVoiture(voiture)
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.recupererListeVoitures()
        this.voitureForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  private recupererListeVoitures(){
    this.voitureService.getVoitures().subscribe(listeVoitures => (this.voitures)= listeVoitures);
  }

  deleteVoiture(id: number) {
    this.voitureService.deleteVoiture(id)
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.recupererListeVoitures()
        this.voitureForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  updateVoiture(id: number){
      this.voiture.nom = this.voitureForm.get('nom').value;
      this.voiture.immatriculation = this.voitureForm.get('immatriculation').value;
      this.voiture.kilometrage = this.voitureForm.get('kilometrage').value;
      this.voitureService.updateVoiture(this.voiture, id)
      .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.affichageModifierVoitureForm = false;
        this.recupererListeVoitures()
        this.voitureForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  modifierVoiture(voiture: Voiture){
    this.voiture = voiture;
    this.voitureForm.patchValue(voiture);
    this.affichageModifierVoitureForm = true;
  }

  annulerForm(){
    this.voitureForm.reset();
    this.affichageModifierVoitureForm = false;
    this.affichageVoitureForm = false;
  }

  voirContrats(voiture: Voiture){
    localStorage.setItem('voiture', JSON.stringify(voiture));
  }
}
