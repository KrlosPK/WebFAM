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
        <Accordion
          header={[
            '¿Dónde se encuentran ubicados?',
            '¿Cuánto tiempo tardan las instalaciones?',
            '¿El envío tiene costo extra?',
            '¿Puedo personalizar mi producto?'
          ]}
          text={[
            'Calle 83E # 57A - 14 Medellín, Colombia.',
            'Dependiendo de nuestra agenda, pero por lo general entre 2 y 5 días hábiles.',
            'El envío lo gestionamos en el proceso de cotización y se aplica en la factura del cliente.',
            '¡Claro que sí! Nosotros nos encargamos de plasmar tus ideas a la realidad.'
          ]}
        />
      </aside>
    </article>
  )
}

export { FrequentQuestions }
