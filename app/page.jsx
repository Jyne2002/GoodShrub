const teas = [
  { id: 'green-tea', name: 'Green Tea', width: 1157, artworkLeft: 154 },
  { id: 'ceylon-black', name: 'Ceylon Black', width: 1468, artworkLeft: 465 },
  { id: 'da-hong-pao', name: 'Da Hong Pao', width: 1088, artworkLeft: 465 },
];
export default function HomePage() {
  return <main className="coming-soon" id="main" tabIndex={-1}>
    <img className="background-pattern" src="/assets/brand/brewing-pattern.png" width="1920" height="768" alt="" aria-hidden="true" />
    <h1><span className="headline-artwork"><img src="/assets/brand/brewing-headline.png" width="1678" height="88" alt="The world's best teas made simple" fetchPriority="high" /></span></h1>
    <div className="homepage-availability"><p>Now available</p><a className="button button-dark" href="/products/green-tea/">Shop now</a></div>
    <div className="product-stage">{teas.map((tea) => <img key={tea.id} className={`product-can can-${tea.id}`} src={`/assets/brand/${tea.id}-can.png`} width={tea.width} height="787" style={{ '--source-width': tea.width, '--source-left': tea.artworkLeft }} alt={`Goodshrub ${tea.name} sparkling cold brew tea can`} fetchPriority="high" />)}</div>
  </main>;
}
