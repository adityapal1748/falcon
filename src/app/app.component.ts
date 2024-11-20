import { Component } from '@angular/core';
interface Match {
  id: string;
  name: string;
}

// League interface with expanded flag
interface League {
  name: string;
  matches: Match[];
  expanded: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment2';
  selectedMatchData:any
  leagues: League[] = [
    {
      name: 'Argentina - Copa de la Liga, Reserves',
      matches: [
        { id: 'arg1', name: 'Belgrano Reserves vs Banfield Reserves' },
        { id: 'arg2', name: 'Lanus Reserves vs Defensa y Justicia Reserves' }
      ],
      expanded: false
    },
    {
      name: 'Bahrain - Premier League',
      matches: [
        { id: 'bhr1', name: 'Al-Riffa vs Al-Ahli' },
        { id: 'bhr2', name: 'Al-Muharraq vs Budaiya' }
      ],
      expanded: false
    },
    {
      name: 'Belgium - Beker van Belgie',
      matches: [
        { id: 'bel1', name: 'Lommel SK vs K Beerschot VA' }
      ],
      expanded: false
    },
    {
      name: 'Brazil - Carioca',
      matches: [
        { id: 'bra1', name: 'Flamengo vs Botafogo' },
        { id: 'bra2', name: 'Vasco da Gama vs Fluminense' }
      ],
      expanded: false
    }
  ];

  toggleLeague(league: any) {
    league.expanded = !league.expanded;
  }
  getMatchDetails(item:any){
    this.selectedMatchData = item
  }

}
