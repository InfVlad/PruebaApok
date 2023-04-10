import { useState } from 'react';
import Button from './components/Button';

/*
Nodos:
{"id": 1,"parent": null,"title": "one", }
"Parent" es el id del nodo padre
Si "parent" es null, es nodo raiz

TODO:
1. Mostrar todos los Nodos Padres
2. Navegar a hijos haciendo click
3. Permitir cambio de idioma (cambia el title)
4. Crear nodos
5. Poder eliminar nodos sin hijos.


*/

function App() {

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-slate-300'>
      <div className='text-3xl font-bold text-green-700'>Inicio de prueba</div>
      <Button text="Nuevo Boton" />
    </div>
  );
}

export default App;
