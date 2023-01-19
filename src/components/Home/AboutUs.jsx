import './AboutUs.css'
import { Card, Button } from '../Utils'

const AboutUs = () => {
	return (
		<main className='AboutUs-container'>
			<div className='info'>
				<h1>¿Qué queremos hacer?</h1>
				<div className='cards'>
					<Card title={'Lorem, ipsum.'} description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro repudiandae, voluptatum neque ut ratione eligendi, illo architecto necessitatibus minima aperiam, commodi animi velit! Ratione cumque autem sequi dolorum temporibus?'} size={'short'} background={'white'} />
					<Card title={'Lorem, ipsum.'} description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro repudiandae, voluptatum neque ut ratione eligendi, illo architecto necessitatibus minima aperiam, commodi animi velit! Ratione cumque autem sequi dolorum temporibus?'} size={'short'} background={'white'} />
					<Card title={'Lorem, ipsum.'} description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro repudiandae, voluptatum neque ut ratione eligendi, illo architecto necessitatibus minima aperiam, commodi animi velit! Ratione cumque autem sequi dolorum temporibus?'} size={'short'} background={'white'} />
				</div>
			</div>
		</main>
	)
}

export { AboutUs }
