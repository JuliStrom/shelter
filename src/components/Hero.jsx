import { asset } from '../data/pets.js';
export default function Hero() { return (<div className="start-screen_content">
                <div className="start-screen_text">
                    <h1>Дом нужен <br /> не только людям</h1>
                    <p>Подарите дом питомцу с большим и открытым сердцем. Он станет вашим верным другом и каждый день будет дарить вам свою любовь!</p>
                    <a href="#Our_pets" className="button1">Найти друга</a>                 
                </div>
                    
                <img className="start-screen_image" src={asset('assets/images/start-screen-puppy.png')}  alt="Щенок, который ищет дом" />
            </div>   
    ); }
