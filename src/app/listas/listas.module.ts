import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListasComponent } from '../components/listas/listas.component';
import { FiltroListaModule } from '../pipes/filtro-lista.module';



@NgModule({
  declarations: [ListasComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroListaModule
  ],
  exports:[ListasComponent]
})
export class ListasModule { }
