import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudHttpService } from '../Service/crud-http.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-devgrid',
  templateUrl: './devgrid.component.html',
  styleUrls: ['./devgrid.component.css']
})
export class DevgridComponent implements OnInit {
  rules: Object;
  public popupVisible = false;
  public addCustomerVisible = false;
  public delObj: any;
  public keyColumnName: any = "id";
  public masterDetailsList: any = [];
  public address: any = [];
  public form: any;
  AddressName: any;
  exportFileName: any = "masterDetailsList";
  formName: any = "Add New Customer";
  btnName: any = "Save";
  pageSize: any;
  pageSizeOptions: any;
  dropdownselectedValue: any;
  constructor(private crudHttpService: CrudHttpService) {
    this.rules = { X: /[01-9]/ };
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 30, 50, 100];
    this.setProduct = this.setProduct.bind(this);
  }
  ngOnInit(): void {
    this.listCustomer();
    this.initForm();
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  initForm(id?: any, FirstName?: any, LastName?: any, Email?: any, MobileNumber?: any, AddressID?: any) {
    if(AddressID != null){
      let Address = this.address.find((x: { id: any; }) => x.id == AddressID);
      this.AddressName = Address.HouseNo + ', ' + Address.Road + ', ' + Address.Village;
    }
    this.form = new FormGroup({
      id: new FormControl(id, Validators.compose([
        Validators.nullValidator
      ])),
      FirstName: new FormControl(FirstName, Validators.compose([
        Validators.required, this.noWhitespaceValidator
      ])),
      LastName: new FormControl(LastName, Validators.compose([
        Validators.required, this.noWhitespaceValidator
      ])),
      Email: new FormControl(Email, Validators.compose([
        Validators.required, this.noWhitespaceValidator
      ])),
      MobileNumber: new FormControl(MobileNumber, Validators.compose([
        Validators.required, this.noWhitespaceValidator
      ])),
      AddressID: new FormControl(AddressID, Validators.compose([
        Validators.required]))
    });
  }
  listCustomer() {
    this.crudHttpService.listCustomer().subscribe((response) => {
      this.masterDetailsList = response;
    }, (error => {
      notify("Error! Server Connection Refused.", "error", 1000);
    }));
    this.crudHttpService.listAddress().subscribe((response) => {
      this.address = response;
    }, (error => {
      notify("Error! Server Connection Refused.", "error", 1000);
    }));
  }
  customerForm() {
    this.addCustomerVisible = true;
  }
  editorPrepared(e: any) {
    if (e.parentType === "dataRow" && e.dataField === "Total_DefiniteQty") {
      e.editorOptions.disabled = true;
    }
  }
  createCustomer(e: any) {
    if (e.id == null) {
      this.crudHttpService.createCustomer(e).subscribe((response) => {
        this.addCustomerVisible = false;
        this.listCustomer();
        notify("Data Save successfully.", "success", 1000);
      }, (error => {
        notify(error, "error", 1000);
      }));
    } else {
      let getaddressid = Array(this.dropdownselectedValue) ? this.dropdownselectedValue[0] : this.dropdownselectedValue;
      let addressInfo = this.address.find((x: { id: any; }) => x.id == getaddressid);
      let addressId = 0;
      if (addressInfo) {
        addressId = addressInfo.id;
      }
      let data = {
        FirstName: e.FirstName,
        LastName: e.LastName,
        Email: e.Email,
        MobileNumber: e.MobileNumber,
        AddressID: addressId
      }
      this.crudHttpService.updateCustomer(e.id, data).subscribe((response) => {
        this.listCustomer();
        this.initForm(null, null, null, null, null, null);
        notify("Data Update successfully.", "success", 1000);
      }, (error => {
        notify(error, "error", 1000);
      }));
    }
  }
  isAddressDropDownBoxOpened = false;
  onSelectionChangedForAddressDropdownGrid(e: any) {
    this.isAddressDropDownBoxOpened = false;
  }
  onSelectionChanged(selectedRowKeys: any, cellInfo: any, dropDownBoxComponent: any) {
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      dropDownBoxComponent.close();
    }
  }
  onValueChanged(e: any){
    console.log(e);
  }
  onSelection(selectedRowKeys: any) {
    // cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      // dropDownBoxComponent.close();
    }
  }
  setProduct(rowData: any, value: any, currentData: any): void {
    if (value) {
      rowData.SourceLocatorID = undefined;
      rowData.DestinationLocatorID = undefined;
      rowData.ProductID = value;
      let prod = this.address.find((x: { id: any; }) => x.id == value);
      rowData.ProductName = prod.ProductName;
      rowData.SourceLocator = undefined;
      rowData.SourceLocator = "";
      rowData.LotName = undefined;
      rowData.LotName = "";
      rowData.Total_DefiniteQty = 0;
      rowData.Quantity = undefined;
      rowData.DesinationLocator = undefined;
      currentData.SourceLocator = undefined;
      currentData.SourceLocator = "";
      currentData.ProductLotID = undefined;
      currentData.LotName = undefined;
      currentData.LotName = "";
      currentData.Total_DefiniteQty = 0;
      currentData.Quantity = undefined;
      currentData.DestinationLocatorID = undefined;
      currentData.DesinationLocator = undefined;
      // this.getLocator(value);
    }
  }
  close() {
    this.addCustomerVisible = false;
    this.initForm(null, null, null, null, null, null);
    this.dropdownselectedValue = undefined;
    this.btnName = "Save";
    this.formName = "Add New Customer";
  }
  clear() {
    this.initForm(null, null, null, null, null, null);
    this.dropdownselectedValue = undefined;
    this.btnName = "Save";
    this.formName = "Add New Customer";
  }
  editCustomer(todo: any) {
    console.log(todo);
    this.addCustomerVisible = true;
    this.btnName = "Update";
    this.formName = "Update Customer";
    this.initForm(todo.id, todo.FirstName, todo.LastName, todo.Email, todo.MobileNumber, todo.AddressID);
  }
  deleteCustomer() {
    console.log(this.delObj);
    let id = this.delObj.id;
    this.popupVisible = false;
    this.crudHttpService.deleteCustomer(id).subscribe((response) => {
      this.listCustomer();
      this.initForm(null, null, null, null, null, null);
      notify("Data Delete successfully.", "success", 1000);
    }, (error => {
      notify(error, "error", 1000);
    }));
  }
  delete(obj: any) {
    this.delObj = obj;
    this.popupVisible = true;
  }
  refreshGrid(e: any) {
    this.listCustomer();
  }
  deleteCancel() {
    this.popupVisible = false;
  }
}
