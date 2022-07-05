
import { Component} from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
public empresas:Array<any>;
public tenantValue:any;


constructor() {
  this.empresas=[];
}


public ngOnInit(){
    this.ObtencionDeTodasLasEmpresas();
}


public async ObtencionDeTodasLasEmpresas(){
    this.empresas = (await axios.get(`http://localhost:11081/tenants/`)).data;
}


public async   deleteTenant() {
    alert("Usted va a eliminar las empresas");
    const array =this.empresas.filter(seleccionEmpresa=>seleccionEmpresa.checked === true);
  
    for(let  element of array){
    console.log("Empresa eliminada" +"  " + element.id)
    const tenant = element.id;
    let respuesta = ( await axios.delete(`http://localhost:11081/tenants/${tenant}`)).data;

    for (let index in this.empresas) {
    if (this.empresas[index].id == element.id) {
    this.empresas.splice(parseInt(index),1);
    }
    }
    }
}


public async addTenant(){
    await axios.post('http://localhost:11081/tenants', {name : this.tenantValue});
    this.ObtencionDeTodasLasEmpresas();   
}


public  async  modifyTenant(){
    const array =this.empresas.filter(seleccionEmpresa=>seleccionEmpresa.checked === true);

    for(let  element of array){
    console.log(element.id)
    const tenant = element.id;
    await axios.patch(`http://localhost:11081/tenants/${tenant}`,{ name: this.tenantValue});
    }
    
    this.ObtencionDeTodasLasEmpresas();
}


}


