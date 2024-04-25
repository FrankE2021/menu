import React from 'react'
import { PRODUCTOS } from './datos';
import { useState } from 'react';

function App() {
  const [PRO,setPRO]=useState(PRODUCTOS)
  const [presupuesto,setPresupuesto]=useState(25)
  const [info,setInfo]=useState("");
  const [COMPRA,setCOMPRA]=useState([]);
  const [total,setTotal]=useState(0);

  function buscar(p){
    let ide=p.target.id;
    return PRO.findIndex(valor=>valor.id==ide)
  }

  function devolver(p){
    let ide=p.target.id;
    let miIndice=PRO.findIndex(valor=>valor.id==ide)
    setPRO(PRO.map((valor, indice)=>
    indice===miIndice ? {...valor,disponible:true} : valor
    ))
    setPresupuesto(presupuesto+PRO[miIndice].precio); 
    setCOMPRA(COMPRA.filter(valor => valor != ide))
    limpiar()
    setTotal(total-PRO[miIndice].precio)
  }

  function conocer(p){
    let miIndice=buscar(p);
    let nombre=PRO[miIndice].nombre;
    let precio=PRO[miIndice].precio;
    setInfo(<span>{nombre} <strong>{precio}$</strong></span>)
  }

  function limpiar(){
    setInfo("")
  }

  function comprar(p){
    let miIndice=buscar(p);
    setPRO(PRO.map((valor, indice)=>
    indice===miIndice ? {...valor,disponible:false} : valor
    ))
    setCOMPRA([...COMPRA,PRO[miIndice].id])
    setPresupuesto(presupuesto-PRO[miIndice].precio); 
    setTotal(total+PRO[miIndice].precio)
  }


  return (
    <>
    <h1><span>♣</span>  Bienvenidos a EUREKAE   <span>♣</span></h1>
    <h2>Escoge tu menu:</h2>
    <section className="contenedor">
      <div className="productos">
        {
          PRO.filter(valor=>valor.disponible===true && valor.precio<=presupuesto).map(valor=>
          <div key={valor.id} className="producto">
            <img id={valor.id} onMouseEnter={conocer} onMouseLeave={limpiar} onClick={comprar} src={require('./img/'+valor.imagen)} alt={valor.nombre}/>
            </div>)
        }
      </div>
    </section>
    <section className="dinero">
      <div className="presu">Presupuesto: <strong> {presupuesto}</strong></div>
      <div className="info">{info}</div>
    </section>
    <section className="carrito">
      {
        COMPRA.map(valor=>
          <div className="producto" key={valor}>
            <img id={PRO[PRO.findIndex(cosa=>cosa.id===valor)].id} onMouseEnter={conocer} onMouseLeave={limpiar} onClick={devolver}
            src={require('./img/'+PRO[PRO.findIndex(cosa=>cosa.id===valor)].imagen)}/> 
          </div>)
      }
    </section>
    <section className="nota">
      <img src={require('./img/logo.webp')}/>
      <div className="lista">
        {
          COMPRA.map(valor=>
            <div className="linea">
              <div className="columna1">{PRO[PRO.findIndex(cosa=>cosa.id===valor)].nombre}</div>
              <div className="columna2">{PRO[PRO.findIndex(cosa=>cosa.id===valor)].precio}$</div>
            </div>
          )
        }
        <div className='total'><h3>A pagar: {total}$</h3></div>
      </div>
    </section>
    </>
  )
}

export default App
