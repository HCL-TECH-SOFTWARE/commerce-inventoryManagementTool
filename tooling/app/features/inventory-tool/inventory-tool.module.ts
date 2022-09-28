/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CdkTableModule } from "@angular/cdk/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { InventoryToolRoutingModule } from "./inventory-tool-routing.module";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateInventoryComponent } from "./components/creat-inventory/create-inventory.component";
import { InventoryListComponent } from "./components/inventory-list/inventory-list.component";
import { DeleteInventoryDialogComponent } from "./components/delete-inventory-dialog/delete-inventory-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		InventoryToolRoutingModule,
		TranslateModule,
		CdkTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,				
		MatIconModule,
		MatInputModule,
		MatButtonToggleModule,
		MatGridListModule,
		MatAutocompleteModule,
		DirectivesModule,
		MatDialogModule,
		MatButtonModule,
		MatStepperModule,
		CdkStepperModule,
		MatCheckboxModule,
		MatSelectModule,
		MatMenuModule,
		MatSlideToggleModule,
		MatListModule,
		MatChipsModule,
		MatTooltipModule
	],
	declarations: [
		CreateInventoryComponent,
		InventoryListComponent,
		DeleteInventoryDialogComponent		
	],
	providers: [
	]
})
export class InventoryToolModule {}
