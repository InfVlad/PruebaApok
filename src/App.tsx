import { useState } from "react";

/*
TODO:
1. Llamar api: "https://api-graph.tests.grupoapok.com"



*/

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="bg-slate-300 min-h-screen w-full flex justify-center items-center">
			<div className="text-3xl text-green-700 font-bold">Inicio de prueba</div>
		</div>
	);
}

export default App;
