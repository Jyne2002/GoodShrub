import TeaPicker from './components/tea-picker';

const teas = [
  { id: 'green-tea', name: 'Green Tea' },
  { id: 'da-hong-pao', name: 'Da Hong Pao' },
  { id: 'ceylon-black', name: 'Ceylon Black' },
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
          <h1>Coming<br />soon.</h1>

          <TeaPicker teas={teas} />
        </div>
      </main>
    </>
  );
}
