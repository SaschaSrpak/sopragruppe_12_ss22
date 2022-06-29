import React, { Component } from "react";
import { Box } from '@mui/material';

/** 
 *@fileOverview 
 *@author
*/

export class Home extends Component {



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

// import React, { Component } from "react";
// import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
// const { sortableContainer, sortableElement, sortableHandle } = ReactSortableHoc
// const DraggableContainer = sortableContainer(({ children }) => children)
// const DraggableElement = sortableElement(({ children }) => children)
// const DraggableHandle = sortableHandle(({ children }) => children)

// const Handle = styled.div`
//   flex: none;
//   width: 7.5px;
//   height: 100%;

//   &::before {
//     content: '';
//     border-left: 4px dotted #ccc;
//     display: block;
//     height: 20px;
//     margin: 15px 3px;
//   }

//   &:hover::before {
//     border-color: #888;
//   }
// `

// const Row = ({ key, index, children, ...rest }) => (
//   <DraggableElement key={key} index={index}>
//     <div {...rest}>
//       <DraggableHandle>
//         <Handle />
//       </DraggableHandle>
//       {children}
//     </div>
//   </DraggableElement>
// )

// const rowProps = ({ rowIndex }) => ({
//   tagName: Row,
//   index: rowIndex,
// })

// class DraggableTable extends React.PureComponent {
//   state = {
//     data: this.props.data,
//   }

//   table = React.createRef()

//   getContainer = () => {
//     return this.table.current.getDOMNode().querySelector('.BaseTable__body')
//   }

//   getHelperContainer = () => {
//     return this.table.current.getDOMNode().querySelector('.BaseTable__table')
//   }

//   rowProps = args => {
//     don't forget to passing the incoming rowProps
//     const extraProps = callOrReturn(this.props.rowProps)
//     return {
//       ...extraProps,
//       tagName: Row,
//       index: args.rowIndex,
//     }
//   }

//   handleSortEnd = ({ oldIndex, newIndex }) => {
//     const data = [...this.state.data]
//     const [removed] = data.splice(oldIndex, 1)
//     data.splice(newIndex, 0, removed)
//     this.setState({ data })
//   }

//   render() {
//     return (
//       <DraggableContainer
//         useDragHandle
//         getContainer={this.getContainer}
//         helperContainer={this.getHelperContainer}
//         onSortEnd={this.handleSortEnd}
//       >
//         <Table
//           {...this.props}
//           ref={this.table}
//           data={this.state.data}
//           fixed={false}
//           rowProps={this.rowProps}
//         />
//       </DraggableContainer>
//     )
//   }
// }

// const Hint = styled.div`
//   font-size: 16px;
//   font-weight: 700;
//   color: #336699;
//   margin-bottom: 10px;
// `

// const columns = generateColumns(10)
// const data = generateData(columns, 200)
// columns[0].minWidth = 150

// export default () => (
//   <>
//     <Hint>Drag the dots, only works in flex mode(fixed=false)</Hint>
//     <DraggableTable columns={columns} data={data} />
//   </>
// )
