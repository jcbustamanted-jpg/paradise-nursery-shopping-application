import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';

const catalog = [
  ['Easy Care', [
    ['snake', 'Snake Plant', 24],
    ['zz', 'ZZ Plant', 29],
    ['pothos', 'Golden Pothos', 18],
    ['spider', 'Spider Plant', 19],
    ['peace-lily', 'Peace Lily', 27],
    ['cast-iron', 'Cast Iron Plant', 32],
  ]],
  ['Tropical Foliage', [
    ['monstera', 'Monstera Deliciosa', 42],
    ['fiddle-fig', 'Fiddle Leaf Fig', 56],
    ['bird-paradise', 'Bird of Paradise', 62],
    ['rubber', 'Rubber Plant', 38],
    ['philodendron', 'Heartleaf Philodendron', 23],
    ['calathea', 'Calathea Orbifolia', 36],
  ]],
  ['Succulents', [
    ['aloe', 'Aloe Vera', 20],
    ['jade', 'Jade Plant', 25],
    ['echeveria', 'Echeveria', 17],
    ['haworthia', 'Zebra Haworthia', 18],
    ['pearls', 'String of Pearls', 22],
    ['burros-tail', "Burro's Tail", 24],
  ]],
];

function thumbnail(index) {
  const color = `hsl(${105 + index * 11}, 38%, 39%)`;
  const leaves = Array.from({ length: 5 + index % 4 }, (_, i) => {
    const x = 65 + i * 18;
    const y = 75 + (i % 3) * 14;
    return `<path d="M120 175 Q${x} 135 ${x} ${y}" stroke="${color}"
      stroke-width="4" fill="none"/>
      <ellipse cx="${x}" cy="${y}" rx="16" ry="31"
      transform="rotate(${i % 2 ? 30 : -30} ${x} ${y})" fill="${color}"/>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <rect width="240" height="240" fill="#edf2e8"/>
    ${leaves}
    <path d="M78 170 H162 L151 220 H89 Z" fill="#bd8063"/>
    <path d="M76 166 H164 V178 H76 Z" fill="#d99b75"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const categories = catalog.map(([name, entries], groupIndex) => ({
  name,
  plants: entries.map(([id, plantName, price], index) => ({
    id,
    name: plantName,
    price,
    description: `Bring the beauty of ${plantName} into your home.`,
    image: thumbnail(groupIndex * 6 + index),
  })),
}));

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const addedIds = new Set(items.map((item) => item.id));

  return (
    <main className="catalog">
      <div className="catalog-intro">
        <h1>Find your next favorite plant</h1>
        <p>Explore the Paradise Nursery collection.</p>
      </div>

      {categories.map((group) => (
        <section className="plant-category" key={group.name}>
          <h2>{group.name}</h2>
          <div className="product-grid">
            {group.plants.map((plant) => {
              const added = addedIds.has(plant.id);
              return (
                <article className="product-card" key={plant.id}>
                  <img className="product-image" src={plant.image}
                    alt={`${plant.name} illustration`} />
                  <div className="product-details">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <strong>${plant.price.toFixed(2)}</strong>
                    <button className="add-button" disabled={added}
                      onClick={() => dispatch(addItem(plant))}>
                      {added ? 'Added to Cart ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
