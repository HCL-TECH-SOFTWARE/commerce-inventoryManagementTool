/**
*==================================================
Copyright [2022] [HCL America, Inc.]
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/

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
