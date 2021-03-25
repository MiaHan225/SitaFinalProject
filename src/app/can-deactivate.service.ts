import { Injectable } from '@angular/core';
import { CanDeactivate  } from '@angular/router';
import { CanComponentDeactivate } from './can-component-deactivate';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService {

  canDeactivate(component: CanComponentDeactivate){
    
    if ( component.canNavigate ==true ){
      return true;
    }else {
      if(confirm("Do you want to discard the changes?")){
        return true;
      } else { return false; } 
    }
  }
}
