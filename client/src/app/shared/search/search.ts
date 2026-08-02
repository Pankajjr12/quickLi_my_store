import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Typed from 'typed.js';
import { MobileService } from '../services/mobile';


@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements AfterViewInit {

  @ViewChild('typedElement') typedElement!: ElementRef;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public mobileService: MobileService
  ) { }

  ngAfterViewInit(): void {
    if (this.router.url.startsWith('/search')) return;

    new Typed(this.typedElement.nativeElement, {
      strings: [
        'Search "milk"',
        'Search "bread"',
        'Search "sugar"',
        'Search "paneer"',
        'Search "chocolate"',
        'Search "curd"',
        'Search "rice"',
        'Search "egg"',
        'Search "chips"',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
      showCursor: false,
    });
  }

  get isSearchPage(): boolean {
    return this.router.url.startsWith('/search');
  }

  get searchText(): string {
    return this.route.snapshot.queryParamMap.get('q') || '';
  }

  redirectToSearchPage() {
    this.router.navigate(['/search']);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  private searchTimeout: any;


  handleOnChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.router.navigate(['/search'], {
        queryParams: value ? { q: value } : {}
      });
    }, 300);
  }
}