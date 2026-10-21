import { asset } from '../data/pets.js';

export default function Donation() {
 return (<section className="donation">
        <img className="donation_image-pet" src={asset('assets/images/donation-dog.png')}  alt="Собака из приюта" width="505" height="261" />
        <div className="content">
            <h2>Вы также можете <br />помочь пожертвованием</h2>
            <h4>Банк и тип счёта</h4>
            <a className="credit_card" href="#Contacts">
                <img src={asset('assets/images/credit-card.svg')}  alt="Банковская карта" />
                <div className="number_card">8380 2880 8028 8791 7435</div>
            </a>
            <p className="legal_inform">Пожертвования помогают обеспечивать животных кормом, лекарствами и необходимым уходом. Чтобы узнать, как помочь приюту и получить актуальные реквизиты, свяжитесь с нами через раздел «Контакты».</p>
        </div>
    
    </section>);
}
