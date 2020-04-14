import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorBadge'
})
export class ColorBadgePipe implements PipeTransform {

  transform(clase: string): string {
    switch (clase) {
      case 'badge-dark':
        return 'Negro';
        break;
      case 'badge-light':
        return 'Blanco';
        break;
      case 'badge-primary':
        return 'Azul';
        break;
      case 'badge-info':
        return 'Celeste';
        break;
      case 'badge-secondary':
        return 'Gris';
        break;
      case 'badge-warning':
        return 'Amarillo';
        break;
      case 'badge-danger':
        return 'Rojo';
        break;
      case 'badge-success':
        return 'Verde';
        break;
      default:
        return 'Error';
        break;
    }
  }

}
