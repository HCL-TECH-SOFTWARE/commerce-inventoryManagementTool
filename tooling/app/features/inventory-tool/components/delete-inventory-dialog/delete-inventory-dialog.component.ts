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


import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { ExtendedSitesService } from "../../../../rest/services/extended-sites.service";

@Component({
	templateUrl: "./delete-inventory-dialog.component.html",
	styleUrls: ["./delete-inventory-dialog.component.scss"]
})
export class DeleteInventoryDialogComponent implements OnInit {
	deleteInventoryForm: FormGroup;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private extendedSitesService: ExtendedSitesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteInventoryDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		
	}

	ngOnInit() {
		this.deleteInventoryForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteInventory() {
		if (!this.processing) {
			this.dialogRef.close({ deleteInventory: true });
		}
	}

}
