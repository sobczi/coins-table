import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CoinDetails } from '@pages/crypto-table/models/CoinDetails';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteButtonComponent {
  @Input() favouriteCoinsIds!: string[] | null;

  @Input() coin!: CoinDetails;

  @Output() coinFavouriteClick = new EventEmitter<string>();

  handleFavouriteClick($event: MouseEvent): void {
    this.coinFavouriteClick.emit(this.coin.id);
    $event.stopImmediatePropagation();
  }
}
