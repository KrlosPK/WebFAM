import './Home.css';

// Components
import { Button } from '../Assets/Button';

const Home = () => {
	return (
		<div className='container'>
			<h1>
				SOLDANDO SUEÑOS
				<span>SOLDANDO SUEÑOS</span>
			</h1>
			<p>
				Diseñamos, fabricamos y realizamos el montaje de estructuras
				metálicas. Impermeabilizamos superficies con soluciones
				asfálticas.
			</p>
			<div className='buttons'>
				<Button text='Contáctanos »' />
				<Button text='⚡ Quiénes somos?' />
			</div>
		</div>
	);
};

export { Home };
