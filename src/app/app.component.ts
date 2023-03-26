import { Component } from '@angular/core';
import { Facturas } from 'src/models/facturas';
import { FacturaService } from 'src/services/facturaService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    FacturaService
  ],
})
export class AppComponent {
  title = 'FacturaFE';


  constructor(private facturaService: FacturaService) {
  
  }
}

