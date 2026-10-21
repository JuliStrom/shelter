import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {pets} from './data/pets.js';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Help from './components/Help.jsx';
import Donation from './components/Donation.jsx';
import Footer from './components/Footer.jsx';

// Resolve navigation against the entry point so nested HTML URLs work on static hosting.
const isCatalog = /\/our_pets\.html$/.test(location.pathname);
const isDetail = /\/pet_jennifer\.html$/.test(location.pathname);
const homeHref = isCatalog ? '../../index.html' : isDetail ? '../../../index.html' : './index.html';
const catalogHref = isCatalog ? './our_pets.html' : isDetail ? '../our_pets.html' : './shelter/pages/our_pets.html';

function useViewport() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);
    return width;
}

function Header({open, setOpen}) {
    const links = [
        ['О приюте', `${homeHref}#About_the_shelter`],
        ['Наши питомцы', catalogHref],
        ['Помочь приюту', `${homeHref}#Help_the_shelter`],
        ['Контакты', '#Contacts'],
    ];
    return <header className="header">
        <a className="logo" href={homeHref}>
            <div className="logo_title">Приют в Софрино</div>
            <div className="logo_subtitile">Помогаем найти любящий дом</div>
        </a>
        {open && <button className="menu-backdrop" aria-label="Закрыть меню" onClick={() => setOpen(false)}/>}
        <nav className={`menu${open ? ' open' : ''}`} aria-label="Основная навигация">
            <ul className="nav_list" id="navigation">{links.map(([label, href], index) => <li key={label}
                                                                                              className={`nav_item${index === (isCatalog || isDetail ? 1 : 0) ? ' item_inactive' : ''}`}>
                <a className="item_link" href={href} onClick={() => setOpen(false)}>{label}</a></li>)}</ul>
            <button className="burger" aria-label="Открыть или закрыть меню" aria-expanded={open}
                    aria-controls="navigation" onClick={() => setOpen(!open)}><span/><span/><span/></button>
        </nav>
    </header>;
}

export function PetCard({pet, onSelect}) {
    return <article className="card" onClick={() => onSelect(pet)}>
        <img className="pic_p" src={pet.img} alt={`${pet.type} ${pet.name}`} width="270" height="270"/>
        <h3>{pet.name}</h3>
        <button className="button_modal-window" aria-haspopup="dialog"
                aria-label={`Подробнее о питомце ${pet.name}`}>Подробнее
        </button>
    </article>;
}

export function PetModal({pet, onClose}) {
    const dialog = useRef(null);
    const startedOutside = useRef(false);
    useEffect(() => {
        const previous = document.activeElement;
        const element = dialog.current;
        if (!element.open) element.showModal();
        return () => {
            if (element.open) element.close();
            if (previous?.isConnected) previous.focus({preventScroll: true});
        };
    }, []);
    return createPortal(
        <dialog ref={dialog} className="pet-dialog" aria-labelledby="pet-title" aria-describedby="pet-description"
                onCancel={event => {
                    event.preventDefault();
                    onClose();
                }}
                onPointerDown={event => {
                    startedOutside.current = event.target === event.currentTarget;
                }}
                onClick={event => {
                    if (event.target === event.currentTarget && startedOutside.current) onClose();
                    startedOutside.current = false;
                }}>
            <div className="pet-dialog-content">
                <button type="button" className="pet-dialog-close" aria-label="Закрыть описание питомца"
                        onClick={onClose}>×
                </button>
                <img className="pet-dialog-image" src={pet.img} alt={pet.name}/>
                <div className="pet-dialog-details">
                    <h2 id="pet-title">{pet.name}</h2>
                    <h3>{pet.type} — {pet.breed}</h3>
          {pet.isDemo && <p className="pet-demo-note">Демонстрационная анкета. Сведения о питомце требуют подтверждения.</p>}
                    <p id="pet-description">{pet.description}</p>
                    <ul className="pet-facts">{[['Возраст', pet.age], ['Прививки', pet.inoculations.join(', ')], ['Заболевания', pet.diseases.join(', ')], ['Паразиты', pet.parasites.join(', ')]].map(([label, value]) =>
                        <li key={label}><strong>{label}:</strong> {value}</li>)}</ul>
                </div>
            </div>
        </dialog>, document.body
    );
}

export function PetGallery({catalog = false, onSelect}) {
    const width = useViewport();
    const count = catalog ? (width >= 1200 ? 8 : width >= 768 ? 6 : 3) : (width >= 1100 ? 3 : width >= 768 ? 2 : 1);
    const [page, setPage] = useState(0);
    const total = pets.length;
    const last = Math.ceil(total / count) - 1;
    const current = Math.min(page, last);
    useEffect(() => setPage(0), [count]);
    const movePage = direction => setPage(previous => (Math.min(previous, last) + direction + last + 1) % (last + 1));
    const visible = Array.from({length: Math.min(count, total - current * count)}, (_, i) => pets[(current * count + i) % pets.length]);
    const cards = <div className={catalog ? 'catalog-cards' : 'slider-cards'}>{visible.map(pet => <PetCard
        key={pet.name} pet={pet} onSelect={onSelect}/>)}</div>;
    const Heading = catalog ? 'h1' : 'h2';
    return <section className={catalog ? 'pets_content' : 'our_friend'} id="Our_pets">
        <Heading className="heading_center">Наши друзья, которые <br/>ищут дом</Heading>
        {catalog ? cards : <div className="slider">
            <button className="arrow left" aria-label="Предыдущие питомцы"
                    onClick={() => movePage(-1)}>←
            </button>
            {cards}
            <button className="arrow right" aria-label="Следующие питомцы"
                    onClick={() => movePage(1)}>→
            </button>
        </div>}
        {catalog ? <nav className="navigation_pets-content" aria-label="Страницы каталога питомцев">
            <button className="arrow" aria-label="Первая страница" disabled={current === 0}
                    onClick={() => setPage(0)}>«
            </button>
            <button className="arrow" aria-label="Предыдущая страница"
                    onClick={() => movePage(-1)}>‹
            </button>
            <span className="arrow current-page" aria-live="polite">{current + 1}</span>
            <button className="arrow" aria-label="Следующая страница"
                    onClick={() => movePage(1)}>›
            </button>
            <button className="arrow" aria-label="Последняя страница" disabled={current === last}
                    onClick={() => setPage(last)}>»
            </button>
        </nav> : <a className="button_get-to-know" href={catalogHref}>Познакомиться со всеми</a>}
    </section>;
}

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const width = useViewport();
    useEffect(() => {
        if (width >= 768) setMenuOpen(false);
    }, [width]);
    useEffect(() => {
        const previous = document.body.style.overflow;
        if (menuOpen || selected) document.body.style.overflow = 'hidden';
        const escape = event => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', escape);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener('keydown', escape);
        };
    }, [menuOpen, selected]);
    return <div className={`body-wraper${isCatalog || isDetail ? ' catalog-page' : ''}`}>
        {isCatalog || isDetail ? <Header open={menuOpen} setOpen={setMenuOpen}/> :
            <section className="start_screen"><Header open={menuOpen} setOpen={setMenuOpen}/><Hero/></section>}
        <main>{isDetail ?
            <section className="pet-detail"><h1>{pets[0].name}</h1><img src={pets[0].img} alt={pets[0].name}/>
                <h2>{pets[0].type} - {pets[0].breed}</h2><p>{pets[0].description}</p>
                <ul className="pet-facts">{['age', 'inoculations', 'diseases', 'parasites'].map(key => <li key={key}>
                    <strong>{{
                        age: 'Возраст',
                        inoculations: 'Прививки',
                        diseases: 'Заболевания',
                        parasites: 'Паразиты'
                    }[key]}:</strong> {String(pets[0][key])}</li>)}</ul>
                <a href={catalogHref}>Вернуться к питомцам</a></section> : isCatalog ?
                <PetGallery catalog onSelect={setSelected}/> : <><About/><PetGallery
                    onSelect={setSelected}/><Help/><Donation/></>}</main>
        <Footer/>{selected && <PetModal pet={selected} onClose={() => setSelected(null)}/>}
    </div>;
}
