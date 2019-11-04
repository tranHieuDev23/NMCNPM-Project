import { Component } from '@angular/core';
import { faFacebookSquare, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public facebook = faFacebookSquare;
  public instagram = faInstagram;
  public github = faGithub;
}
