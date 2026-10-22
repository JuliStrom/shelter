import { asset } from '../data/pets.js';

export default function About() {
 return (<section className="about" id="About_the_shelter">
        <img src={asset('assets/images/about-pets.jpg')}  alt="Собака и кошка из приюта" className="section-about_image" />
        <div className="about-shelter_text">
            <h2>О приюте<br />«Кожуховский приют»</h2>
            <p className="paragraf_text">Мы — волонтёры Кожуховского приюта для бездомных животных. Помогаем собакам и кошкам найти дом, заботу и своего человека. С января 2023 года приют находится в Малинках, в Троицком округе Москвы.</p>
            <p className="paragraf_text">В каталоге — фотографии и истории подопечных с сайта волонтёров vao-priut.org. Некоторые животные находятся на передержках. Чтобы узнать, где сейчас питомец и как познакомиться с ним, свяжитесь с куратором из его карточки.</p>
        </div>
    </section>);
}
