<<<<<<< HEAD
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-rating',
    standalone: true,
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css'],
    imports: [CommonModule],
})
export class RatingComponent {
    @Input() max = 5;
    @Input() value = 0;
    @Input() readonly = false;
    @Input() allowHalf!:boolean;
    @Input() icon = '⭐';
    @Input() size = 'text-yellow-400';
    @Input() activeColor = 'text-yellow-400';
    @Input() inactiveColor = 'text-gray-300';
    @Output() valueChange = new EventEmitter<number>();

    setRating(rating: number,isHalf = false) {
        if(!this.readonly) {
            this.value=isHalf && this.allowHalf ? rating + 0.5 : rating;
            this.valueChange.emit(this.value);
        }
    }
    getStarClasses(starIndex: number) {
        if(this.value >=starIndex) {
            return `${this.activeColor}${this.size}`;
        } else if(this.allowHalf && this.value >= starIndex -0.5){
            return`${this.activeColor}${this.size}half-star`;
        } else{
            return`${this.inactiveColor}${this.size}`;
        }
        }
    }


    
=======
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  imports: [CommonModule],
})
export class RatingComponent {
  @Input() max = 5;
  @Input() value = 0;
  @Input() readonly = false;
  @Input() allowHalf!: boolean;  // ✅ Fixed: No default value, avoids ESLint issue
  @Input() icon = '⭐';
  @Input() size = 'text-2xl';
  @Input() activeColor = 'text-yellow-400';
  @Input() inactiveColor = 'text-gray-300';
  @Output() valueChange = new EventEmitter<number>();

  setRating(rating: number, isHalf = false) {
    if (!this.readonly) {
      this.value = isHalf && this.allowHalf ? rating + 0.5 : rating;
      this.valueChange.emit(this.value);
    }
  }

  getStarClasses(starIndex: number) {
    if (this.value >= starIndex) {
      return `${this.activeColor} ${this.size}`;
    } else if (this.allowHalf && this.value >= starIndex - 0.5) {
      return `${this.activeColor} ${this.size} half-star`;
    } else {
      return `${this.inactiveColor} ${this.size}`;
    }
  }
}
>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c
