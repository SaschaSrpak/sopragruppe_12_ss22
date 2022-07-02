import * as React from "react";
import { Component } from "react";
import { Link } from '@material-ui/core';


/**
 *@fileOverview Zeigt alle Mitwirkenden im Projekt mit Verweis auf die Git-Repository
 *@author Luca Trautmann
*/

export class About extends Component {



  render() {
    return (
      <div>
        <h2>
          Software-Praktikum im SS 2022
        </h2>
       
        <br />
        <p>
          React Frontend written by
          <Link href='https://github.com/LucaTrautmann'> Luca Trautmann, </Link>
          <Link href='https://github.com/KimKausler'>Kim Kausler, </Link>
          <Link href='https://github.com/SaschaSrpak'>Sascha Srpak, </Link>
          <Link href='https://github.com/JeffreyHe0605'>Jeffrey He</Link>
        </p>
        <p>
          Python Backend written by
          <Link href='https://github.com/LeonardJustus'> Leonard Justus, </Link>
          <Link href='https://github.com/LiamWilke'>Liam Wilke </Link>
        </p>
        <br />
        <p variant='body2'>
          © Gruppe 8 2022, all rights reserved.
        </p>
      </div>
    )
  }

};
export default About;