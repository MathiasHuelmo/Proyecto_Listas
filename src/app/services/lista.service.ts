import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public listas: Lista[] = []; //Almacena las listas de actividades
  constructor(
    public alertController:AlertController,
    public toastController:ToastController
  ) {
    this.cargarStorage();
   }

  crearLista(nombreLista: string){
    let ObjetoLista = new Lista(nombreLista);

    this.listas.push(ObjetoLista); //Ingresamos en el array de listas el objeto con los datos creados.
    this.guardarStorage();

    return ObjetoLista.titulo;
  }

  guardarStorage(){
    let stringListas:string = JSON.stringify(this.listas); //Convertirmos el array de listas en texto plano
    localStorage.setItem('listas',stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el segundo el contenido
  }

  cargarStorage(){
    const listaStorage = localStorage.getItem('listas');

    if(listaStorage === null){
      return this.listas = []; //Si el Storage está vacío, devolvemos el objeto listas vacío también
    }
    else{
      let objLista = JSON.parse(listaStorage); //Convierte el texto plano a objeto para poder ingresarlo
      return this.listas = objLista
    }
  }

  eliminarLista(lista:Lista){
    let nuevoListado = this.listas.filter((listaItem)=>listaItem.id !== lista.id); //Guardamos todas las listas menos la lista a eliminar
    //filter devuelve un arreglo de listas
    this.listas = nuevoListado;
    this.guardarStorage();
  }

  editarLista(lista:Lista){
    let listaEditar = this.listas.find((listaItem)=>listaItem.id == lista.id); //Guardaremos todas las listas menos la lista a editar
    //Filter devuelve el primer valor que encuentra
    if(listaEditar){
      listaEditar.titulo = lista.titulo;
    }
    this.guardarStorage();
  }

  validarInput(input:any):boolean{
    if(input && input.titulo){
      return true
    }
    else{
      this.presentToast('Debe ingresar un valor.');
      return false
    }
  }

  async presentToast(mensaje:string){
    let toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });

    toast.present();
  }


  obtenerLista(idLista: string | number){
    const id = Number(idLista); //Parseamos el dato a Number, por si viene de tipo string, de esta manera siempre trabajaremos con un Number

    let lista = this.listas.find((itemLista)=> itemLista.id == id);
    return lista;
  }
}
