import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrat } from '../modele/contrat';
import { Observable } from 'rxjs';

const routes = {
    contrat: 'http://localhost:9090/carouts/contrat'

}

@Injectable()
export class ContratService {
  
    constructor(private httpClient: HttpClient) { }

    voitures: Contrat[];

    getContrats(): Observable<Contrat[]> {
    return this.httpClient.get<Contrat[]>(routes.contrat);
    }   

    getContratsParVoiture(id: number): Observable<Contrat[]> {
        return this.httpClient.get<Contrat[]>(routes.contrat+'/voiture/'+id);
        }   

    getContrat(id: number): Observable<Contrat> {
        return this.httpClient.get<Contrat>(routes.contrat+'/'+id);
        }  

    postContrat(contrat:Contrat): Observable<Contrat>{
        return this.httpClient.post<Contrat>(routes.contrat, contrat);
    }

    deleteContrat(id: number): Observable<any>{
        return this.httpClient.delete<any>(routes.contrat+'/'+id);
    }

    updateContrat(contrat:Contrat, id:number): Observable<Contrat>{
        return this.httpClient.put<Contrat>(routes.contrat+'/'+id, contrat);
    }


}