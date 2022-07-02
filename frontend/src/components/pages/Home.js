import React, { Component } from "react";


/** 
 *@fileOverview Representiert die Homepage dedikiert zu einer kurzen Projektvorstellung
 *@author
*/

export class Home extends Component {


//rendert in diesem Fall einfache Textfelder und Überschriften
    render() {

        return (
            <div >
                <h1> Software-Praktikum im SS 2022 </h1>
                <h4> Modul: 335138 Software-Praktikum ; Prüfungsleistung: KMP <br></br>
                    Prof. Dr. Thies und Prof. Dr. Kunz</h4><br/>
                <h4>Einleitung </h4>
                <p>Ziel der Lehrveranstaltung ist eine Vertiefung der in
                    den vorangegangenen Semestern vermittelten
                    Grundlagen zur Software-Entwicklung und zu Datenbanken. Im Zuge dessen sollen im Rahmen der
                    Veranstaltungen einerseits weitere Techniken vermittelt werden. Andererseits sollen diese Techniken
                    von allen Studierenden im Kontext eines Projekts angewendet werden. Da Software stets ein Ergebnis
                    von Teams ist, sollen auch in diesen Veranstaltungen
                    die Projektarbeiten im Gruppenkontext durchgeführt werden.</p><br/>
                <h4>Zielsystems </h4>
                <p>Jede Gruppe hat die Aufgabe, ein verteiltes System zur kollaborativen Zeiterfassung
                    und Auswertung von Projektarbeit zu realisieren. <br />
                    Das System soll die Arbeitszeiterfassung durch Projektbeteiligte sowie
                    deren Auswertung durch Benutzer ermöglichen.<br />
                    Die Applikation soll Personen unterstützen, ihre Arbeitsleistung zu Projekten und deren Aktivitäten zu
                    verwalten und für Benutzer verlässlich auswertbar
                    zu machen.</p>
            </div>
        )
    }
}

export default Home;