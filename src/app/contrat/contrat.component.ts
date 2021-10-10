import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrat } from '../modele/contrat';
import { Produit } from '../modele/produit';
import { Voiture } from '../modele/voiture';
import { ContratService } from '../service/contrat.service';
import { ProduitService } from '../service/produit.service';
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  
  contratForm: FormGroup;
  produits: Produit[];
  produit: Produit;
  voiture: Voiture;
  contrat: Contrat;
  contrats: Contrat[];
  idVoiture: number;
  affichageContratForm = false;
  submitted = false;
  affichageModifierContratForm = false;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private contratService: ContratService,
  ) {}

  ngOnInit() {
    this.produitService.getProduits().subscribe(listeProduits => (this.produits)= listeProduits);
    this.recupererVoiture();
    this.recupererContrat();
    this.createForm();
  }

  private createForm(){
    this.contratForm = this.formBuilder.group({
      nom:[null, Validators.required],
      produit:[null, Validators.required],
      modele:[null, Validators.required],
      nomPrestataire:[null, Validators.required],
      prix:[null, Validators.required],
      commentaire:[null],
    })
  }

  afficherForm() {
    this.contratForm.reset();
    this.affichageContratForm = true;
    this.affichageModifierContratForm = false;
  }

  onSubmit() {
    this.submitted = true;
    this.contratForm.controls.produit.patchValue(this.produits[this.contratForm.controls.produit.value]);
    console.log(this.contratForm.value)
    // stop here if form is invalid
    if (this.contratForm.invalid) {
      console.log('formulaire incomplet')
      return;
    }

    // display form values on success  
    const contrat: Contrat = this.contratForm.getRawValue()
    contrat.voiture = this.voiture;
    this.contratService.postContrat(contrat)
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.recupererContrat()
        this.contratForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  enregistrer(){
    this.affichageContratForm = false;
    this.onSubmit();
  }

  
  deleteContrat(id: number) {
    this.contratService.deleteContrat(id)
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.recupererContrat()
        this.contratForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  recupererVoiture(){
    this.voiture = JSON.parse(localStorage.getItem('voiture'));
    this.idVoiture = this.voiture.id;
  }

  recupererContrat(){
    this.contratService.getContratsParVoiture(this.idVoiture).subscribe(listeContrats => (this.contrats)= listeContrats);
  }

  modifierContrat(contrat: Contrat){
    this.contrat = contrat;
    this.contratForm.patchValue(contrat);
    this.affichageModifierContratForm = true;
    this.affichageContratForm = false;
  }

  annulerForm(){
    this.contratForm.reset();
    this.affichageModifierContratForm = false;
    this.affichageContratForm = false;
  }
  

  updateContrat(id: number){
    this.contrat.nom = this.contratForm.get('nom').value;
    this.contrat.prix = this.contratForm.get('prix').value;
    this.contrat.produit = this.recupererProduits(this.contratForm.get('produit').value);
    this.contrat.nomPrestataire = this.contratForm.get('nomPrestataire').value;
    this.contrat.modele = this.contratForm.get('modele').value;
    this.contrat.commentaire = this.contratForm.get('commentaire').value;
    this.contrat.dateCreation = null;
    this.contratService.updateContrat(this.contrat, id)
    .subscribe(() => {
      console.log('Enregistrement terminé !');
      this.affichageModifierContratForm = false;
      this.recupererContrat()
      this.contratForm.reset();
    },
    (error) => {
      console.log('Erreur ! : ' + error);
      }
    );
  }

  recupererProduits(id: number){
    return this.produits.find(produit => produit.id === id)
  }
}
