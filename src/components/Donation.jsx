import { asset } from '../data/pets.js';

const paymentMethods = ['Сбербанк', 'PayPal', 'Банковские карты: Visa, Mastercard, Maestro, American Express, Discover', 'Paysend', 'Яндекс Деньги'];

export default function Donation() {
 return (
  <section className="donation" aria-labelledby="donation-title">
   <img className="donation_image-pet" src={asset('assets/images/donation-dog.png')} alt="Собака из приюта" width="505" height="261" />
   <div className="content">
    <h2 id="donation-title">Вы также можете <br />помочь пожертвованием</h2>
    <h3 className="donation-methods-title">Способы финансовой помощи</h3>
    <ul className="donation-methods">
     {paymentMethods.map(method => <li key={method}>{method}</li>)}
    </ul>
    <p className="legal_inform">Чтобы узнать актуальные реквизиты и доступность выбранного способа перевода, свяжитесь с волонтёрами через раздел «Контакты».</p>
    <p className="donation-other-help">Можно помочь и руками, вещами, рекламой или добрым словом.</p>
   </div>
  </section>
 );
}
