import { Component } from '@angular/core';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../persona.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  nombreInput: string;
  apellidoInput: string;
  index: number;
  modoEdicion : number; // Declaramos una variabal para recuperar el parametro

  constructor(private loggingService: LoggingService,
    private personaService: PersonasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personaService.saludar.subscribe(
      (indice: number) => alert("El indice es:" + indice)
    );
  }

  ngOnInit() {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion']; //para recupera utilizamo la siguiente linea
    // + convierte a numero
    if (this.modoEdicion != null && this.modoEdicion === 1) { // Si es diferente de nulo es EDICION
      let persona: Persona = this.personaService.encontrarpersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }

  onGuardarPersona() {
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    if (this.modoEdicion != null && this.modoEdicion === 1) { //Modo Edición
      this.personaService.modificarPersona(this.index, persona1);
    } else { //Nuevo
      this.personaService.agregarPersona(persona1)
    }
    //this.personaService.agregarPersona(persona1);
    this.router.navigate(['personas']);
  }

  eliminarPersona() {
    if (this.index != null) {
      this.personaService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);

  }


}
