import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {

  nombreImagen: string ;

  constructor(private imagenservice: ImagenService) {
    this.nombreImagen='';
   }

  ngOnInit(): void {
  }

  buscarImagenes(){
    // console.log('buscarImagenes funcionando!' + this.nombreImagen);
    if ( this.nombreImagen === '') {
      this.imagenservice.setError('Agrega un Texto para buscar.');
      return;
    }

    this.imagenservice.enviarTerminoBusqueda(this.nombreImagen);
  }

}
