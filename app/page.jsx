const teas = [
  { id: 'green-tea', name: 'Green Tea', width: 1157, artworkLeft: 154 },
  { id: 'ceylon-black', name: 'Ceylon Black', width: 1468, artworkLeft: 465 },
  { id: 'da-hong-pao', name: 'Da Hong Pao', width: 1088, artworkLeft: 465 },
];
export default function HomePage() {
  return <main className="coming-soon" id="main" tabIndex={-1}>
    <img className="background-pattern" src="/assets/brand/brewing-pattern.png" width="1920" height="768" alt="" aria-hidden="true" />
    <h1><span className="headline-artwork headline-start"><img src="/assets/brand/brewing-headline.png" width="1271" height="105" alt="Something is brewing" fetchPriority="high" /></span><span className="headline-artwork headline-end" aria-hidden="true"><img src="/assets/brand/brewing-headline.png" width="1271" height="105" alt="" /></span><span className="brewing-dots" aria-hidden="true"><span /><span /><span /></span></h1>
    <div className="product-stage">{teas.map((tea) => <img key={tea.id} className={`product-can can-${tea.id}`} src={`/assets/brand/${tea.id}-can.png`} width={tea.width} height="787" style={{ '--source-width': tea.width, '--source-left': tea.artworkLeft }} alt={`Goodshrub ${tea.name} sparkling cold brew tea can`} fetchPriority="high" />)}</div>
  </main>;
}
