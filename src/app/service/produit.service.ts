import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../modele/produit';
import { Observable } from 'rxjs';

const routes = {
    produit: 'http://localhost:9090/carouts/produit'

}

@Injectable()
export class ProduitService {
  
    constructor(private httpClient: HttpClient) { }

    voitures: Produit[];

    getProduits(): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(routes.produit);
    }   

    getProduit(id: number): Observable<Produit> {
        return this.httpClient.get<Produit>(routes.produit+'/'+id);
        }  

}