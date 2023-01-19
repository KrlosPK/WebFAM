import './Home.css'

// Components
import { Button } from '../Utils'
import { Services } from './Services'
import { AboutUs } from './AboutUs'

const Home = () => {
	return (
		<>
			<main className='home-container'>
				<h1>
					SOLDANDO SUEÑOS
					<span>SOLDANDO SUEÑOS</span>
				</h1>
				<p>Diseñamos, fabricamos y realizamos el montaje de estructuras metálicas. Impermeabilizamos superficies con soluciones asfálticas.</p>
				<div className='buttons'>
					<Button text='Contáctanos »' width={200} />
					<Button text='⚡ Quiénes somos?' width={200} />
				</div>
			</main>
			<Services />
			<AboutUs />
		</>
	)
}

export { Home }
