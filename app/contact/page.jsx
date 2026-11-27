'use client';
import { whatsappLink } from '../products';

export default function ContactPage() {
  function handleSubmit(event) { event.preventDefault(); const form = new FormData(event.currentTarget); const message = `Hello Goodshrub!\n\nName: ${form.get('name')}\n\n${form.get('message')}`; window.open(whatsappLink(message), '_blank', 'noopener,noreferrer'); }
  return <main id="main" className="inner-page contact-page"><div className="contact-layout"><div className="contact-intro"><p className="eyebrow">We'd love to hear from you</p><h1>Let’s talk<br />good tea<span className="accent-dot">.</span></h1><div className="contact-details"><div><span>Find us</span><p>No. 334, T.B Jayah Mawatha<br />Colombo 10, Sri Lanka</p></div><div><span>Give us a call</span><p><a href="tel:+13648886830">+1 (364) 888-6830</a></p></div><div><span>Send us a little note</span><p><a href="mailto:hello@goodshrub.com">hello@goodshrub.com</a></p></div></div></div><div className="contact-card"><p className="eyebrow">Get in touch</p><h2>Send us a message.</h2><form onSubmit={handleSubmit}><label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Message<textarea name="message" required rows="5" placeholder="What’s on your mind?" /></label><button className="button button-dark" type="submit">Continue to WhatsApp</button></form></div></div></main>;
}
