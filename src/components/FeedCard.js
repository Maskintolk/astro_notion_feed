import { LitElement, html, css  } from "lit";

export const tagName = 'feed-card';

const styles = css`
  :host {
    width: 500px;
    height: 300px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 1px rgb(0 0 0 / 14%);
    border-color: #BDBDBD;
  }
  header {
    border-top: 20px solid #FFA000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
    background-color: #FFC107;
    color: #FFECB3;
  }  
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
    background-color: #fff;
  }
  a {
    text-decoration: none;
  }
  h1 {
    text-align: center;
    color: #5d240f;
  }
  h2 {
    color: #757575;
  }
`;

class FeedCard extends LitElement {
  constructor() {
    super();
    this.page = {};
  }

  static get properties() {
    return {
      page: { type: Object }
    }
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <header>
        <a href="/trips/${this.page.id}"><h1>${this.page.icon?.emoji} ${this.page.title}</h1></a>
      </header>
      <footer>
        <h2>${this.page.date}</h2>
      </footer>
    `;
  }
}

customElements.define(tagName, FeedCard);