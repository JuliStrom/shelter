import { asset } from '../data/pets.js';

export default function About() {
 return (<section className="about" id="About_the_shelter">
        <img src={asset('assets/images/about-pets.jpg')}  alt="Собака и кошка из приюта" className="section-about_image" />
        <div className="about-shelter_text">
            <h2>О приюте<br />«Приют в Софрино»</h2>
            <p className="paragraf_text">Сейчас под нашей опекой 121 собака и 342 кошки. По статистике, только 20% из них находят семью. Остальные продолжают жить в приюте и ждать встречи с человеком, который подарит им заботу и любовь.</p>
            <p className="paragraf_text">Мы заботимся о питании, здоровье и благополучии наших подопечных. Нам помогают 87 волонтёров и 28 сотрудников разных специальностей. Около 12% животных находят дом у работников приюта: заботясь о питомцах, люди привязываются к ним и уже не хотят расставаться.</p>
        </div>
    </section>);
}
