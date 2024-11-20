import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-match-data',
  templateUrl: './match-data.component.html',
  styleUrls: ['./match-data.component.css']
})
export class MatchDataComponent implements OnInit,OnChanges {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  @Input() selectedMatch: any = {
    name: 'Lommel SK vs K Beerschot VA',
    options: [
      { type: 'Home', value: '1.85' },
      { type: 'Draw', value: '3.60' },
      { type: 'Away', value: '5.00' }
    ]
  };

  matchPnLData = [
    {
      option: '1 X 2',
      rows: [
        { type: 'Home', radar: '1.85', falcon: '2.50', initialFalcon: '2.50', stake: '1000', initialStake: '1000', sinRisk: '921', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "", multiDist: "", isEditingFalcon: false, isEditingStake: false },
        { type: 'Draw', radar: '3.60', falcon: '3.60', initialFalcon: '3.60', stake: '88', initialStake: '88', sinRisk: '0', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "702[1]", multiDist: "", isEditingFalcon: false, isEditingStake: false },
        { type: 'Away', radar: '3.80', falcon: '5.00', initialFalcon: '5.00', stake: '44', initialStake: '44', sinRisk: '0', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "", multiDist: "", isEditingFalcon: false, isEditingStake: false },
      ],
      radar: '108.15',
      falcon: '87.78',
      sinLimit: 587,
      sinRisk: '0',
      sinBet: 3,
      stake: 307,
      pnl: 140,
      multiRisk: 702,
      multiDist: '702 [1]',
    },
    {
      option: 'Under Over +1.5',
      radar: '119.95',
      falcon: '119.95',
      sinLimit: 588,
      sinRisk: '',
      sinBet: 0,
      stake: 0,
      pnl: 0,
      multiRisk: 0,
      multiDist: '0',
      rows: [
        { type: 'Under', radar: '1.85', falcon: '2.50', initialFalcon: '2.50', stake: '175', initialStake: '175', sinRisk: '0', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "702[1]", multiDist: "", isEditingFalcon: false, isEditingStake: false },
        { type: 'Over', radar: '3.60', falcon: '3.60', initialFalcon: '3.60', stake: '88', initialStake: '88', sinRisk: '0', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "702[1]", multiDist: "", isEditingFalcon: false, isEditingStake: false }]
    },
    {
      option: 'Under Over +2.5',
      radar: '119.64',
      falcon: '119.64',
      sinLimit: 589,
      sinRisk: '0',
      sinBet: 0,
      stake: 0,
      pnl: 0,
      multiRisk: 532,
      multiDist: '',
      rows: [{ type: 'Under', radar: '1.85', falcon: '2.50', initialFalcon: '2.50', stake: '175', initialStake: '175', sinRisk: '0', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "", multiDist: "", isEditingFalcon: false, isEditingStake: false },
      { type: 'Over', radar: '3.60', falcon: '3.60', initialFalcon: '3.60', stake: '88', initialStake: '88', sinRisk: '0', sinBet: "1", sinStake: "175", pnl: "0", multiRisk: "702[1]", multiDist: "", isEditingFalcon: false, isEditingStake: false }
      ]
    },
  ];

  constructor(private renderer: Renderer2) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }
  

  toggleEdit(itemIndex: number, rowIndex: number, field: 'falcon' | 'stake') {
    // Reset all editing states
    this.matchPnLData.forEach(item =>
      item.rows.forEach(row => {
        row.isEditingFalcon = false;
        row.isEditingStake = false;
      })
    );

    // Enable editing for the selected field
    const row = this.matchPnLData[itemIndex].rows[rowIndex];
    const key = `isEditing${field.charAt(0).toUpperCase() + field.slice(1)}` as 'isEditingFalcon' | 'isEditingStake';
    row[key] = true;

    // Focus the input field after a short delay
    setTimeout(() => {
      const inputField = document.querySelector(
        `#${field}-input-${itemIndex}-${rowIndex}`
      ) as HTMLInputElement;
      if (inputField) inputField.focus();
    });
  }

  saveEdit(row: any, field: 'falcon' | 'stake') {
    // Disable editing for the specified field of the given row
    const key = `isEditing${field.charAt(0).toUpperCase() + field.slice(1)}` as 'isEditingFalcon' | 'isEditingStake';
    row[key] = false;
  }


  handleArrowNavigation(event: KeyboardEvent, itemIndex: number, rowIndex: number, field: 'falcon' | 'stake', row?: any) {
    if (field === 'falcon') {
      // Handle arrow key navigation for "falcon" field
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent default scrolling behavior

        const newRowIdx = event.key === 'ArrowDown' ? rowIndex + 1 : rowIndex - 1;

        // Navigate within the current item or jump to the next/previous item if applicable
        if (
          newRowIdx >= 0 &&
          newRowIdx < this.matchPnLData[itemIndex].rows.length
        ) {
          this.toggleEdit(itemIndex, newRowIdx, field);
        } else if (event.key === 'ArrowDown' && itemIndex + 1 < this.matchPnLData.length) {
          this.toggleEdit(itemIndex + 1, 0, field);
        } else if (event.key === 'ArrowUp' && itemIndex - 1 >= 0) {
          const prevRows = this.matchPnLData[itemIndex - 1].rows;
          this.toggleEdit(itemIndex - 1, prevRows.length - 1, field);
        }
      }

      // Handle "Enter" key for saving and moving to the next row
      if (event.key === 'Enter' && this.isValidNumberInput((event.target as HTMLInputElement).value)) {
        console.log("Enter")
        row.falcon = (event.target as HTMLInputElement).value;
        const newRowIdx = rowIndex + 1
        if (
          newRowIdx >= 0 &&
          newRowIdx < this.matchPnLData[itemIndex].rows.length
        ) {
          this.toggleEdit(itemIndex, newRowIdx, field);

        } else if (itemIndex + 1 < this.matchPnLData.length) {
          this.toggleEdit(itemIndex + 1, 0, field);
        }
      }
    } else {
      // Handle arrow key navigation for "stake" field
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();

        const newRowIdx = event.key === 'ArrowDown' ? rowIndex + 1 : rowIndex - 1;

        if (
          newRowIdx >= 0 &&
          newRowIdx < this.matchPnLData[itemIndex].rows.length
        ) {
          this.toggleEdit(itemIndex, newRowIdx, field);
        } else if (event.key === 'ArrowDown' && itemIndex + 1 < this.matchPnLData.length) {
          this.toggleEdit(itemIndex + 1, 0, field);
        } else if (event.key === 'ArrowUp' && itemIndex - 1 >= 0) {
          const prevRows = this.matchPnLData[itemIndex - 1].rows;
          this.toggleEdit(itemIndex - 1, prevRows.length - 1, field);
        }
      }
      if (event.key === 'Enter' && this.isValidNumberInput((event.target as HTMLInputElement).value)) {
        console.log("Enter")
        row.stake = (event.target as HTMLInputElement).value;
        const newRowIdx = rowIndex + 1
        if (
          newRowIdx >= 0 &&
          newRowIdx < this.matchPnLData[itemIndex].rows.length
        ) {
          this.toggleEdit(itemIndex, newRowIdx, field);

        } else if (itemIndex + 1 < this.matchPnLData.length) {
          this.toggleEdit(itemIndex + 1, 0, field);
        }
      }
    }

  }

  isValidNumberInput(value: any): boolean {
    // Validate that the input is a valid number (with or without a decimal point)
    const regex = /^[0-9]*\.?[0-9]+$/;
    console.log(regex.test(value))
    return regex.test(value);
  }

  getPercentage(row: any): number {
    if (row.sinRisk === 0) return 0; // Avoid division by zero
    return (row.sinRisk / row.stake) * 100; // Calculate percentage
  }

  getPixel(row: any) {
    // Convert percentage into progress bar pixel width
    const percentage = this.getPercentage(row);
    const progressWidth = (percentage / 100) * 80; // Assume 80 pixels is full width
    return progressWidth;
  }

  getProgressBarBackground(row: any): string {
    const percentage = this.getPercentage(row);

    // Determine the background color based on the percentage
    if (percentage <= 33.33) {
      return 'green';
    } else if (percentage > 33.33 && percentage <= 77) {
      return 'yellow';
    } else {
      return 'red';
    }
  }


}
