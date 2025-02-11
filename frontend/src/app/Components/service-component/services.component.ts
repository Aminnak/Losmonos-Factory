import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
@Component({
  selector: 'app-services',
  imports: [RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
    repeatCount = [1,2,3,4,5]
    images = [
        'images/cameraPic1.jpg',
        'images/cameraPic2.jpg',
        'images/cameraPic3.jpg',
        'images/cameraPic4.jpg',
        'images/cameraPic5.jpg',
    ]
}
