import { Produit } from "./produit";
import { Voiture } from "./voiture";

export class Contrat {
    id: number;
    nom: String;
    dateCreation: String;
    prix: String;
    nomPrestataire: String;
    modele: String;
    commentaire: String;
    voiture: Voiture;
    produit: Produit;
}