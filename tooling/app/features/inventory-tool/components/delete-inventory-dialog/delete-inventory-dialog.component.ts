/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */

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
