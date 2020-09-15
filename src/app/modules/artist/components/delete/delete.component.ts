import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {

  //ID del artista a eliminar dado desde el componente padre
  @Input() idArtist;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  /**
   * @name closeModal
   * @description Metodo para cerrar el modal sin confirmar
  */
  closeModal(){
    this.activeModal.close();
  }

  /**
   * @name confirmModal
   * @description Método para confirmar la eliminación del artista.
   * @param id ID del artista a eliminar.
   */
  confirmModal(id) {
    this.activeModal.close(id);
  }

}
