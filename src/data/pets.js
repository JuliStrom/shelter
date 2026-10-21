import data from '../../shelter/assets/pets.json';
const files = import.meta.glob('../../shelter/assets/**/*.{jpg,png,svg}', { eager: true, query: '?url', import: 'default' });
export const asset = path => files['../../' + path];
export const pets = data.map(pet => ({ ...pet, img: asset(pet.img) }));
