import './FrequentQuestions.css'

//? Components
import { Button2 } from '../../Utils/Button2/Button2'
import { Accordion } from '../../Utils/Accordion/Accordion'

const FrequentQuestions = () => {
  return (
    <article className='frequent-questions'>
      <section className='flex'>
        <h2 className='frequent-questions__title'>Preguntas Frecuentes</h2>
        <p className='frequent-questions__text'>
          Si algo no te ha quedado claro, no dudes en contactarnos y te responderemos lo más pronto
          posible.
        </p>
        <a
          href='https://api.whatsapp.com/send/?phone=573147561960&text=¡Hola!%20Quisiera%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0'
          target={'_blank'}
        >
          <Button2 text='Escríbenos' />
        </a>
      </section>
      <aside>
        <Accordion />
      </aside>
    </article>
  )
}

export { FrequentQuestions }
