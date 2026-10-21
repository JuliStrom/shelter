import { asset } from '../data/pets.js';

export default function Help() {
 return (<section className="help" id="Help_the_shelter">
            <h2 className="heading_center">Как помочь <br />нашему приюту</h2>
            <div className="list">
                <div className="icons">
                    <img src={asset('assets/icons/Pet-food.jpg')}  alt="Корм для животных" />
                    <h3>Корм для животных</h3>
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/transportation.jpg')}  alt="Перевозка" />
                    <h3>Перевозка</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/toys.jpg')}  alt="Игрушки" />
                    <h3>Игрушки</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/bowls-and-cups.jpg')}  alt="Миски и поилки" />
                    <h3>Миски и поилки</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/shampoos.jpg')}  alt="Шампуни" />
                    <h3>Шампуни</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/vitamins.jpg')}  alt="Витамины" />
                    <h3>Витамины</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/medicines.jpg')}  alt="Лекарства" />
                    <h3>Лекарства</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/collars-or-leashes.jpg')}  alt="Ошейники и поводки" />
                    <h3>Ошейники и поводки</h3> 
                </div>
                <div className="icons">
                    <img src={asset('assets/icons/sleeping-area.jpg')}  alt="Лежанки" />
                    <h3>Лежанки</h3> 
                </div>
            </div>
        </section>);
}
