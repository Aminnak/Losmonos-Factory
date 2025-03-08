import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FooterComponent } from '../../components/footer/footer.component';
import { filter, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    isSumbitActive: boolean = false;
    private subscriptions: Subscription[] = [];

    productImages = [
        { name: 'DJI Mavic 3', url: 'images/cameraPic1.jpg' },
        { name: 'GoPro Hero12 Black', url: 'images/cameraPic2.jpg' },
        { name: 'Canon EOS R5', url: 'images/cameraPic3.jpg' },
        { name: 'Sony RX100 VII ', url: 'images/cameraPic4.jpg' },
        { name: 'Fujifilm X-T30 II', url: 'images/cameraPic5.jpg' },
    ];

    userComments = [
        {
        name: 'Lissa dolor',
        url: 'images/random1.jpg',
        comment: `Absolutely love this product! The quality is outstanding,
                and it exceeded my expectations. Highly recommend
                to anyone looking for something reliable and well-made.`,
        },
        {
        name: 'Adam Scotia',
        url: 'images/random2.jpg',
        comment: `Impressed with the durability and performance. It works flawlessly,
                and the attention to detail is remarkable.
                Will definitely buy again!`,
        },
        {
        name: 'William polauny',
        url: 'images/random3.jpg',
        comment: `Great value for the price! The design is sleek, and it functions
                just as described. Couldn't be happier with this purchase.`,
        },
    ];

    constructor(private route: ActivatedRoute, private router: Router) { }

    scrollToElement(id: string) {
        const element = document.getElementById(id);
        if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 1)
        }
    }

    ngOnInit(): void {
        const fragmentSubscription = this.route.fragment.pipe(take(1)).subscribe(fragment => {
            if (fragment) {
                this.scrollToElement(fragment);
            }
        });
        this.subscriptions.push(fragmentSubscription)
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
}
