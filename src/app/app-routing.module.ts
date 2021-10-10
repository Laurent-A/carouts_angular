import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VoitureService } from './service/voiture.service';
import { AppComponent } from './app.component';
import { ProduitService } from './service/produit.service';
import { HomeComponent } from './home/home.component';
import { VoitureComponent } from './voiture/voiture.component';
import { ContratComponent } from './contrat/contrat.component';
import { ContratService } from './service/contrat.service';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'voiture', component: VoitureComponent },
  { path: 'contrat', component: ContratComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    VoitureService,
    ProduitService,
    ContratService
  ],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
