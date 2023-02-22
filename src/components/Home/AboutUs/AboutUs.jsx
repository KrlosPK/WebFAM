import './AboutUs.css'
import { Card, Button } from '../../Utils'

const AboutUs = () => {
	return (
		<main className='AboutUs-container'>
			<div className='info'>
				<h1 className='info__title'>
					¡Los mejores servicios para nuestros clientes!
				</h1>
				<h2 className='info__subtitle'>
					En FADEMET tenemos en cuenta tus deseos y por ellos día a
					día nos esforzamos para hacer que nuestros servicios sean
					los mejor para ti.
				</h2>
				<div className='cards'>
					<Card
						title={'Lorem, ipsum.'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro repudiandae, voluptatum neque ut ratione eligendi, illo architecto necessitatibus minima aperiam, commodi animi velit! Ratione cumque autem sequi dolorum temporibus?'
						}
						size={'extralarge'}
						background={'white'}
					/>
					<Card
						title={'Lorem, ipsum.'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro repudiandae, voluptatum neque ut ratione eligendi, illo architecto necessitatibus minima aperiam, commodi animi velit! Ratione cumque autem sequi dolorum temporibus?'
						}
						size={'extralarge'}
						background={'white'}
					/>
					<Card
						title={'Lorem, ipsum.'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro repudiandae, voluptatum neque ut ratione eligendi, illo architecto necessitatibus minima aperiam, commodi animi velit! Ratione cumque autem sequi dolorum temporibus?'
						}
						size={'extralarge'}
						background={'white'}
					/>
				</div>
			</div>
		</main>
	)
}

export { AboutUs }
