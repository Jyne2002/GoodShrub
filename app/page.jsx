import TeaPicker from './components/tea-picker';

const teas = [
  {
    id: 'green-tea', name: 'Green Tea', width: 669, height: 601,
    details: 'A classic Chinese Chunmee Green. Grown 500 meters above sea level in the Golden Triangle region, this green tea offers a smooth chestnut flavor. Its glossy, tightly rolled leaves deliver a bright green brew that is fresh and rich with a brisk, sweet aftertaste that lingers. Single origin premium iced tea. Source: Jiangxi Province, China, Green Tea Golden Triangle.',
  },
  {
    id: 'da-hong-pao', name: 'Da Hong Pao', width: 664, height: 598,
    details: 'The world’s most exclusive Oolong. Roasted and rich with natural energy, this rare tea from China’s Wuyi Mountains is usually reserved for rituals and collectors. Now served cold brewed and gently sparkling for a clean, luxury brew on the go. Single origin premium iced tea. Source: South East China, Zheng Yan, Wuyi Mountains.',
  },
  {
    id: 'ceylon-black', name: 'Ceylon Black', width: 673, height: 602,
    details: 'Grown in a rich tropical rainforest. This bold, smooth and naturally flavour rich tea blends the purity of Sri Lanka’s Lumbini Valley with a refreshing sparkle. Its slow-release infusion reveals layered complexity, strength and a remarkable aroma in every sip. Single origin premium iced tea. Source: South West Sri Lanka, UNESCO Sinharaja Rainforest.',
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="/" aria-label="Goodshrub home">
          <img
            src="/assets/brand/goodshrub-logo.png"
            width="403"
            height="48"
            alt="Goodshrub"
          />
        </a>
      </header>

      <main className="coming-soon" id="main">
        <h1>Something good is brewing.</h1>

        <img
          className="background-pattern"
          src="/assets/brand/pattern.png"
          width="1920"
          height="768"
          alt=""
          aria-hidden="true"
        />

        <div className="product-stage">
          {teas.map((tea) => (
            <img
              key={tea.id}
              className={`product-can can-${tea.id}`}
              src={`/assets/brand/${tea.id}.png`}
              width="792"
              height="792"
              alt={`Goodshrub ${tea.name} sparkling iced tea can`}
              fetchPriority={tea.id === 'green-tea' ? 'high' : 'auto'}
            />
          ))}
        </div>

        <div className="coming-soon-copy">
          <div className="tea-details">
            {teas.map((tea) => (
              <img
                key={tea.id}
                className={`tea-information details-${tea.id}`}
                src={`/assets/brand/${tea.id}-details.png`}
                width={tea.width}
                height={tea.height}
                alt={`${tea.name} tasting notes and origin. ${tea.details}`}
              />
            ))}
          </div>

          <TeaPicker teas={teas.map(({ id, name }) => ({ id, name }))} />
        </div>
      </main>
    </>
  );
}
