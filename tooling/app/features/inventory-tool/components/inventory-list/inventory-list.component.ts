/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";



import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { InventoryService } from "../../../../rest/services/inventory.service";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteInventoryDialogComponent } from "../delete-inventory-dialog/delete-inventory-dialog.component";

export interface InventoryDataSource {
	catalogEntryId: string;
	storeId: string;
	fulfilmentCenterId: string;
	quantity: string;
}


@Component({
	templateUrl: "./inventory-list.component.html",
	styleUrls: ["./inventory-list.component.scss"]
})
export class InventoryListComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = [
		"catalogEntryId",
		"storeId",
		"fulfilmentCenterId",
		"quantity",
		"actions"
	];
	dataSource = new MatTableDataSource<InventoryDataSource>();

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;
	activeColumn = `+catalogEntryId,+storeId,+fulfillmentCenterId`;
	sortDirection = "asc";
	pageIndex = 0;
	length = 0;

	catalogentryIdSearchForm: FormGroup;
	searchCatalogEntryIdText: FormControl;
	currentSearchString = null;

	listSearchFrom1: FormGroup;
	searchText: FormControl;
	store: FormControl;
	fulfilmentCenterId:FormControl;

	storeList: Array<any> = [];
	FCenterList:Array<any> = [];
	selectedFcenter=null;
	selectedStore = null;
	showFilters = false;
	statusFilter = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
	private getStoreNameSubscription: Subscription = null;

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private router: Router,
		private route: ActivatedRoute,
		private alertService: AlertService,
		private translateService: TranslateService,
		private onlineStoresService: OnlineStoresService,
		private currentUserService: CurrentUserService,
		private inventoryService: InventoryService,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.displayProducts();
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
		
	}

	private createFormControls() {
		this.searchCatalogEntryIdText = new FormControl(this.currentSearchString);
		this.store = new FormControl(null);
		this.fulfilmentCenterId = new FormControl(null);
	}

	private createForm() {
		this.listSearchFrom1 = new FormGroup({
			store: this.store,			
			fulfilmentCenterId:this.fulfilmentCenterId
		});
		this.catalogentryIdSearchForm = new FormGroup({
			searchCatalogEntryIdText: this.searchCatalogEntryIdText
		});
	}
	toggleShowFilters(e: any) {
		this.showFilters = e.checked;
	}
	displayProducts() {
		let params = {
			offset: this.pageIndex >= 0 ? this.pageIndex * this.pageSize : null,
			limit: this.pageSize || null,
			sortOrder: this.activeColumn || null,
			sortdirection: this.sortDirection || null,
			catalogEntryId: this.currentSearchString >= 0 ? this.currentSearchString : null,
			storeId:this.selectedStore?.id|| null,
			fulfillmentCenterId:this.selectedFcenter?.id || null
		}
		this.inventoryService.getInventory(params).subscribe(res => {
			console.log(res);
			this.dataSource.data = (res.items || []).map(item => {
				return {
					catalogEntryId: item.catalogEntryId,
					storeId: item.storeId,
					fulfilmentCenterId: item.fulfillmentCenterId,
					quantity: item.quantity
				}
			});
			this.length = res.count;
		})
	}
	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			console.log("direction ", sort);
			this.activeColumn = sort.direction === 'asc' ? '+'+sort.active: '-'+sort.active;
			this.sortDirection = sort.direction;
			this.pageIndex = 0;
			this.displayProducts();
		});

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
			this.storeList=storeArray;
		});
		// this.dataSource.paginator = this.paginator;
		// this.dataSource.sort = this.sort;

		
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
		this.store.setValue(store.identifier+"-"+store.id);
		if (currentStoreId !== store.id) {
			this.storeList = [];
			this.searchStores("");
		}
		
		this.selectedFcenter = null;
		this.fulfilmentCenterId.setValue(null);
       this.searchFcenters(store.id);
	   this.displayProducts();
	}
	fcenters=[];
	searchFcenters(storeId){
		this.inventoryService.getFullfilmentCenters(storeId).subscribe(res => {
           this.FCenterList=res.items;
		   this.fcenters=JSON.parse(JSON.stringify(this.FCenterList))
		})
	}

	searchFullfilmentCenter(val){
		
       this.FCenterList=this.fcenters.filter(item => item.name === val);
	   console.log(this.FCenterList);
	}
	resetSelectedFCenter(){

	}
	selectFCenter(fcenter) {
      console.log(fcenter);
	  this.selectedFcenter = fcenter;
	  this.fulfilmentCenterId.setValue(fcenter.name+"-"+fcenter.id);
	  this.displayProducts();
	}


	/**Method to refresh Inventory */
	refresh() {
		this.activeColumn=`+catalogEntryId,+storeId,+fulfillmentCenterId`;
		this.currentSearchString = null;
		this.searchCatalogEntryIdText.setValue(null);
		this.pageIndex = 0;
		this.selectedStore=null;
		this.selectedFcenter=null
		this.store.setValue(null);
		this.fulfilmentCenterId.setValue(null);
		this.displayProducts();
	}
	handlePage(e) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.displayProducts();
	}
	deleteInventory(invdata) {
		console.log(invdata); 

		const dialogRef = this.dialog.open(DeleteInventoryDialogComponent, {
			...this.dialogConfig,
			data: {
				
			}
		});

		dialogRef.afterClosed().subscribe(data => {
			if (data && data.deleteInventory) {
				let param ={
					catalogEntryId: invdata.catalogEntryId,
					storeId:invdata.storeId,
					fulfillmentCenterId:invdata.fulfilmentCenterId
				}
				this.inventoryService.deleteInventory(param).subscribe(res => {
					console.log(res);
					this.alertService.success({ message: "Inventory deleted Successfully" });
					this.displayProducts();
				})
			}
		});




		
	}
	editInventory(data){
		this.router.navigate(["inventory/edit-inventory", {
			catalogEntryId: data.catalogEntryId,
			storeId:data.storeId,
			fulfillmentCenterId:data.fulfilmentCenterId,
			quantity:data.quantity
		}]);
	}
	searchProductsByCatalogEntryId(val) {
		console.log(val, "search");
		this.currentSearchString = val;
		this.searchCatalogEntryIdText.setValue(val);
		if(val === ""){
			this.currentSearchString = null;
			this.searchCatalogEntryIdText.setValue(null);
		}		
		this.displayProducts();
	}
	clearSearch() {
		this.currentSearchString = null;
		this.searchCatalogEntryIdText.setValue(null);
		this.pageIndex = 0;
		this.displayProducts();
	}

	createInventory() {
		this.router.navigate(["inventory/create-inventory", {}]);
		
	}

}


