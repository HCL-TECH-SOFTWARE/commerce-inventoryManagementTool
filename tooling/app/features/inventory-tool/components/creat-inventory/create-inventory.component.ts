/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */

import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { InventoryService } from "../../../../rest/services/inventory.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { debounceTime } from "rxjs/operators";


@Component({
	templateUrl: "./create-inventory.component.html",
	styleUrls: ["./create-inventory.component.scss"]
})
export class CreateInventoryComponent implements OnInit, AfterViewInit {
	@ViewChild("stepper") stepper: MatStepper;
	skuid = "";
	quantity = "";
	storeId = "";
	fulfilmentcenter = "";
	pageTitle = "New Inventory";

	listSearchFrom1: FormGroup;
	searchText: FormControl;
	store: FormControl;
	fulfilmentCenterId: FormControl;

	storeList: Array<any> = [];
	FCenterList: Array<any> = [];
	selectedFcenter = null;
	selectedStore = null;
	showFilters = false;
	statusFilter = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
	private getStoreNameSubscription: Subscription = null;
	constructor(private router: Router,
		private route: ActivatedRoute,
		private alertService: AlertService,
		private onlineStoresService: OnlineStoresService,
		private currentUserService: CurrentUserService,
		private inventoryService: InventoryService,
		private translateService: TranslateService) { }

	editFlag = false;
	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
		console.log("beofre");
		this.route.params.subscribe((params: Params) => {
			if (params.storeId && params.catalogEntryId && params.fulfillmentCenterId) {
				this.editFlag = true;
				this.skuid = params.catalogEntryId;
				this.quantity = params.quantity;
				this.store.setValue(params.storeId);
				this.store.disable();
				this.selectedStore = {};
				this.selectedFcenter = {};
				this.selectedStore.id = params.storeId;
				this.fulfilmentCenterId.setValue(params.fulfillmentCenterId);
				this.fulfilmentCenterId.disable();
				this.selectedFcenter.id = params.fulfillmentCenterId;
				this.pageTitle = "Update Inventory";
				console.log("after-", params);
			} else {
				this.editFlag = false;
			}
		});

	}
	private createFormControls() {
		this.store = new FormControl(null);
		this.fulfilmentCenterId = new FormControl(null);
	}

	private createForm() {
		this.listSearchFrom1 = new FormGroup({
			store: this.store,
			fulfilmentCenterId: this.fulfilmentCenterId
		});

	}

	ngAfterViewInit() {

		this.onlineStoresService.getOnlineStoresByIdentifier({
			identifier: '**',
			usage: "HCL_TaxTool",
			limit: 30
		}).subscribe(onlineStoreResponse => {
			if (this.getStoreNameSubscription) {
				this.getStoreNameSubscription.unsubscribe();
				this.getStoreNameSubscription = null;
			}
			const storeArray = onlineStoreResponse.items;
			this.storeList = storeArray;
		});

	}
	/**Method to search for Store */
	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}
	/**Method to reset the Stores */
	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}
	/**Method to get all the stores */
	getStores(searchString: string) {
		if (this.getStoresSubscription != null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			usage: "HCL_TaxTool",
			identifier: "*" + searchString + "*",
			limit: 10
		}).subscribe(response => {
			this.getStoresSubscription = null;
			if (response.items.length === 1 && response.items[0].identifier === this.store.value) {
				this.selectStore(response.items[0]);
			} else {
				this.storeList = response.items;
			}

		},
			error => {
				this.getStoresSubscription = null;
			});
	}
	/**Method to select the store */
	selectStore(store: any) {
		if (this.getStoreNameSubscription) {
			this.getStoreNameSubscription.unsubscribe();
			this.getStoreNameSubscription = null;
		}
		const currentStoreId = this.selectedStore ? this.selectedStore.id : null;
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedStore = store;
		this.store.setValue(store.identifier + "-" + store.id);
		if (currentStoreId !== store.id) {
			this.storeList = [];
			this.searchStores("");
		}

		this.selectedFcenter = null;
		this.fulfilmentCenterId.setValue(null);
		this.searchFcenters(store.id);

	}
	fcenters = [];
	searchFcenters(storeId) {
		this.inventoryService.getFullfilmentCenters(storeId).subscribe(res => {
			this.FCenterList = res.items;
			this.fcenters = JSON.parse(JSON.stringify(this.FCenterList))
		})
	}

	searchFullfilmentCenter(val) {

		this.FCenterList = this.fcenters.filter(item => item.name === val);
		console.log(this.FCenterList);
	}
	resetSelectedFCenter() {

	}
	selectFCenter(fcenter) {
		console.log(fcenter);
		this.selectedFcenter = fcenter;
		this.fulfilmentCenterId.setValue(fcenter.name + "-" + fcenter.id);

	}
	cancel() {
		this.router.navigate(["inventory", "inventory-list", {}]);
	}
	clear() {
		this.alertService.clear();
		this.skuid = "";
		this.quantity = "";
		this.selectedFcenter = null;
		this.selectedStore = null;
		this.store.setValue(null);
		this.fulfilmentCenterId.setValue(null);
	}

	keyPressNumeric(event) {
		var inp = String.fromCharCode(event.keyCode);
		if (/[0-9]/.test(inp)) {
			return true;
		} else {
			event.preventDefault();
			return false;
		}
	}

	validateForm() {
		if (this.skuid === "" || this.quantity === "" || this.selectedStore?.id === undefined || this.selectedFcenter?.id === undefined) {
			return false;
		} else {
			if (parseInt(this.quantity) > 0) {
				return true;
			} else {
				return false;
			}
		}
	}
	submit() {
		if (this.validateForm()) {
			var data = {
				"catalogEntryId": this.skuid,
				"quantity": this.quantity,
				"quantityMeasure": "C62",
				"inventoryFlags": 0,
				"storeId": this.selectedStore?.id,
				"fulfillmentCenterId": this.selectedFcenter?.id,
				"links": {
					"self": {
						"href": "string"
					}
				}
			};
			console.log(data);
			if (this.editFlag) {
				let param ={
					catalogEntryId: this.skuid,
					storeId:this.selectedStore?.id,
					fulfillmentCenterId:this.selectedFcenter?.id
				}
				this.inventoryService.updateInventory(data,param).subscribe(res => {
					console.log(res);
					this.alertService.success({ message: "Inventory updated Successfully" });
					this.router.navigate(["inventory", "inventory-list", {}]);
				})

			} else {
				this.inventoryService.saveInventory(data).subscribe(res => {
					console.log(res);
					this.alertService.success({ message: "Inventory added Successfully" });
					this.router.navigate(["inventory", "inventory-list", {}]);
				})
			}
		} else {
			if (parseInt(this.quantity) <= 0) {
				this.alertService.error({ message: "Please provide quantity value greater than 0" });
			} else {
				this.alertService.error({ message: "Please provide all the inventory details" });
			}

		}
	}
}
