import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrat } from '../modele/contrat';
import { Produit } from '../modele/produit';
import { Voiture } from '../modele/voiture';
import { ContratService } from '../service/contrat.service';
import { ProduitService } from '../service/produit.service';

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
  maDate = new Date();
  affichageModifierContratForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private contratService: ContratService,
    private datePipe: DatePipe
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
    console.log(this.contratForm);
    this.affichageModifierContratForm = true;
    this.affichageContratForm = false;
  }

  annulerForm(){
    this.contratForm.reset();
    this.affichageModifierContratForm = false;
    this.affichageContratForm = false;
  }
  
}
