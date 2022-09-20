import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonGroupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxValidatorModule, DxButtonModule, DxLoadPanelModule, DxChartModule, DxTileViewModule, DxListModule, DxFileUploaderModule, DxToolbarModule, DxSelectBoxModule, DxDataGridModule, DxPopupModule, DxLookupModule, DxTagBoxModule, DxAccordionModule, DxDrawerModule, DxRadioGroupModule, DxTooltipModule, DxTemplateModule, DxContextMenuModule, DxDropDownBoxModule, DxDateBoxModule, DxSwitchModule, DxDiagramModule, DxGanttModule, DxScrollViewModule, DxPieChartModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevgridComponent } from './devgrid/devgrid.component';

@NgModule({
  declarations: [
    AppComponent,
    DevgridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonGroupModule,
    ReactiveFormsModule,
    DxFormModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxMenuModule,
    DxValidatorModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxChartModule,
    HttpClientModule,
    DxTileViewModule,
    DxListModule,
    DxFileUploaderModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxLookupModule,
    DxTagBoxModule,
    DxAccordionModule,
    DxDrawerModule,
    DxRadioGroupModule,
    DxTooltipModule,
    DxTemplateModule,
    DxContextMenuModule,
    DxDropDownBoxModule,
    DxDateBoxModule,
    DxSwitchModule,
    DxDiagramModule,
    DxGanttModule,
    DxScrollViewModule,
    DxPieChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
