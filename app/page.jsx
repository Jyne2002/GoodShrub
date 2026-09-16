const teas = [
  { id: 'green-tea', name: 'Green Tea', width: 1157, artworkLeft: 154 },
  { id: 'ceylon-black', name: 'Ceylon Black', width: 1468, artworkLeft: 465 },
  { id: 'da-hong-pao', name: 'Da Hong Pao', width: 1088, artworkLeft: 465 },
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
        <nav className="header-actions" aria-label="Contact Goodshrub">
          <a className="contact-link inquire-link" href="tel:+94112697151">
            <img src="/assets/brand/inquire-phone.png" width="453" height="30" alt="Inquire Now at (+94)11 2697151" />
          </a>
          <span className="contact-divider" aria-hidden="true" />
          <a className="contact-link instagram-link" href="https://www.instagram.com/goodshrub/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/brand/follow-instagram.png" width="341" height="29" alt="Follow Us on Instagram" />
          </a>
        </nav>
      </header>

      <main className="coming-soon" id="main" tabIndex={-1}>
        <img
          className="background-pattern"
          src="/assets/brand/brewing-pattern.png"
          width="1920"
          height="768"
          alt=""
          aria-hidden="true"
        />

        <h1>
          <span className="headline-artwork headline-start">
            <img
              src="/assets/brand/brewing-headline.png"
              width="1271"
              height="105"
              alt="Something is brewing"
              fetchPriority="high"
            />
          </span>
          <span className="headline-artwork headline-end" aria-hidden="true">
            <img
              src="/assets/brand/brewing-headline.png"
              width="1271"
              height="105"
              alt=""
            />
          </span>
          <span className="brewing-dots" aria-hidden="true">
            <span /><span /><span />
          </span>
        </h1>

        <div className="product-stage">
          {teas.map((tea) => (
            <img
              key={tea.id}
              className={`product-can can-${tea.id}`}
              src={`/assets/brand/${tea.id}-can.png`}
              width={tea.width}
              height="787"
              style={{ '--source-width': tea.width, '--source-left': tea.artworkLeft }}
              alt={`Goodshrub ${tea.name} sparkling cold brew tea can`}
              fetchPriority="high"
            />
          ))}
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-copy">
            <p>A Product of Akbar Brothers (Pvt) Ltd</p>
            <p>No. 334, T.B Jayah Mawatha, <br />Colombo 10, Sri Lanka</p>
            <p>This product is sustainably grown <br />and responsibly made</p>
          </div>
          <span className="certification-badge">
            <img
              src="/assets/brand/footer-artwork.png"
              width="1861"
              height="74"
              alt="Rainforest Alliance Certified"
            />
          </span>
        </div>
      </footer>
    </>
  );
}
