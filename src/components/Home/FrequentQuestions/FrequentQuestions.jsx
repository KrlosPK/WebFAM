import './FrequentQuestions.css'

// ? Components
import { Button2 } from '../../Utils/Button2/Button2'
import { Accordion } from '../../Utils/Accordion/Accordion'
import { Link } from 'react-router-dom'
import { Button } from '../../Utils'

const FrequentQuestions = () => {
  return (
    <article className='frequent-questions' id='preguntasFrecuentes'>
      <section className='flex'>
        <h2 className='frequent-questions__title'>Preguntas Frecuentes</h2>
        <p className='frequent-questions__text'>
          Si algo no te ha quedado claro, no dudes en contactarnos y te responderemos lo más pronto
          posible.
        </p>
        <div className='frequent-questions__buttons'>
          <a
            href='https://api.whatsapp.com/send/?phone=573147561960&text=¡Hola!%20Quisiera%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0'
            target={'_blank'}
            rel='noreferrer'
          >
            <Button text='Escríbenos' width={133} />
          </a>
          <Link to='/frequent-questions'>
            <Button2 text='Ver más' width={133} />
          </Link>
        </div>
      </section>
      <aside>
        <Accordion />
      </aside>
    </article>
  )
}

export { FrequentQuestions }
