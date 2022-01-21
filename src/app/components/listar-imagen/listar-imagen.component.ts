import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  termino: string = '';
  suscripcion: Subscription;
  listarImagenes: any[] = [];
  loading: boolean= false;
  imagenPorPagina = 4;
  paginaActual = 1;
  calcularTotalPaginas= 0;

  constructor(private imagenservices: ImagenService) {
    this.suscripcion = this.imagenservices.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.paginaActual=1;
      this.loading= true;
      this.obtenerImagenes();
    }
    );
  }

  ngOnInit(): void {
  }

  obtenerImagenes(){
    this.imagenservices.getImages(this.termino, this.imagenPorPagina, this.paginaActual).subscribe(data => {
      // console.log(data);
      this.loading=false;


      if (data.hits.length === 0) {
        this.imagenservices.setError('Opps! No se han encontrado ningún resultado');
        return;
      }

      //math floor redondea para abajo. Math ceil hacia arriba
      // console.log(Math.ceil( data.totalHits / this.imagenPorPagina));
      this.calcularTotalPaginas = Math.ceil( data.totalHits / this.imagenPorPagina);

      this.listarImagenes = data.hits;
    }, error => {
      this.imagenservices.setError('Ha ocurrido un error en la petición');
      this.loading=false;
    });
  }

  paginaAnterior(){
    this.paginaActual--;
    this.loading= true;
    this.listarImagenes= [];
    this.obtenerImagenes();
  }

  paginaSiguiente(){
    this.paginaActual++;
    this.loading= true;
    this.listarImagenes= [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass(){
     if (this.paginaActual === 1) {
      return false
    }
    else{
    return true;
    }
  }


  paginaSiguienteClass(){
    if (this.paginaActual === this.calcularTotalPaginas) {
     return false;
   }
   else{
   return true;
   }
 }


}
