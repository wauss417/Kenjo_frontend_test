
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { LoadingScreenService } from "@app/services/loader.service";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoadingScreenComponent implements AfterViewInit, OnDestroy {

  debounceTime: number = 100;
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService,
              private _elmRef: ElementRef,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(debounceTime(this.debounceTime)).subscribe(
      (status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
