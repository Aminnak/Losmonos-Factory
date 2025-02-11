import { Component } from '@angular/core';
import { RouterModule} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    isSumbitActive = false
    repeatCount = [1,2,3,4,5]
    productImages = [
        {name:'DJI Mavic 3',url : 'images/cameraPic1.jpg'},
        {name:'GoPro Hero12 Black',url : 'images/cameraPic2.jpg'},
        {name:'Canon EOS R5',url : 'images/cameraPic3.jpg'},
        {name:'Sony RX100 VII ',url : 'images/cameraPic4.jpg'},
        {name:'Fujifilm X-T30 II',url : 'images/cameraPic5.jpg'},
    ]

    userComments = [
        {
            name : 'Lissa dolor',
            url : 'images/random1.jpg',
            comment :
            `Absolutely love this product! The quality is outstanding,
            and it exceeded my expectations. Highly recommend
            to anyone looking for something reliable and well-made.`,
        },
        {
            name : 'Adam Scotia',
            url : 'images/random2.jpg',
            comment :
            `Impressed with the durability and performance. It works flawlessly,
            and the attention to detail is remarkable.
            Will definitely buy again!`,},

        {
            name : 'William polauny',
            url : 'images/random3.jpg',
            comment :
            `Great value for the price! The design is sleek, and it functions
            just as described. Couldn't be happier with this purchase.`,
        },
    ]
}
