import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Voiture } from '../modele/voiture';
import { Observable } from 'rxjs';

const routes = {
    voitures: 'http://localhost:9090/carouts/voiture'

}

@Injectable()
export class VoitureService {
  
    constructor(private httpClient: HttpClient) { }

    voitures: Voiture[];

    getVoitures(): Observable<Voiture[]> {
    return this.httpClient.get<Voiture[]>(routes.voitures);
    }   

    getVoiture(id: number): Observable<Voiture> {
        return this.httpClient.get<Voiture>(routes.voitures+'/'+id);
        }  

    postVoiture(voiture:Voiture): Observable<Voiture>{
        return this.httpClient.post<Voiture>(routes.voitures, voiture);
    }

    deleteVoiture(id: number): Observable<any>{
        return this.httpClient.delete<any>(routes.voitures+'/'+id);
    }

    updateVoiture(voiture:Voiture, id:number): Observable<Voiture>{
        return this.httpClient.put<Voiture>(routes.voitures+'/'+id, voiture);
    }


}