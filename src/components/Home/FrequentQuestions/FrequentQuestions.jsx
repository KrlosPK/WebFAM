import './FrequentQuestions.css'

//? Components
import { Button2 } from '../../Utils/Button2/Button2'
import { OpenCard } from '../../Utils/OpenCard/OpenCard'

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
          href='https://api.whatsapp.com/send/?phone=573147561960&text&type=phone_number&app_absent=0'
          target={'_blank'}
        >
          <Button2 text='Escríbenos' />
        </a>
      </section>
      <aside>
        <OpenCard
          header='¿Dónde se encuentran ubicados?'
          text='Calle 83E # 57A - 14 Medellín, Colombia.'
        />
        <OpenCard
          header='¿Cuánto tiempo tardan las instalaciones?'
          text='Dependiendo de nuestra agenda, pero por lo general entre 2 y 5 días hábiles.'
        />
        <OpenCard
          header='¿El envío tiene costo extra?'
          text='El envío lo gestionamos en el proceso de cotización y se aplica en la factura del cliente.'
        />
        <OpenCard
          header='¿Puedo personalizar mi producto?'
          text='¡Claro que sí! Nosotros nos encargamos de plasmar tus ideas a la realidad.'
        />
      </aside>
    </article>
  )
}

export { FrequentQuestions }
