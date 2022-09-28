/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateInventoryComponent } from "./components/creat-inventory/create-inventory.component";
import { InventoryListComponent } from "./components/inventory-list/inventory-list.component";

const routes: Routes = [
	{
		path: "create-inventory", component: CreateInventoryComponent
	},
	{
		path: "edit-inventory", component: CreateInventoryComponent
	},
	{
		path: "inventory-list", component: InventoryListComponent
	},
	{
		path: "", redirectTo: "inventory-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class InventoryToolRoutingModule { }
