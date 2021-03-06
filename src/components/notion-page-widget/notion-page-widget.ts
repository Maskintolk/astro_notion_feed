import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './styles';
import { waitingTemplate } from './waiting-template';
import { underConstructionTemplate } from './under-construction-template';
import { template } from './template';

/**
 * An element which fetches a page from Notion from its id, and
 * displays the cover image as a link to the page.
 */
@customElement('notion-page-widget')
export class NotionPageWidget extends LitElement {
  static styles = styles;

  /**
   * The size determines how big the widget is displayed. The sizes correspond to the sizes of
   * pages in a Gallery view in Notion.
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Title of the Notion page
   */
  @property({ type: String })
  pagetitle: string | undefined = '';

  /**
   * The url of the image. Initially set to a spinner
   */
  @property({ type: String })
  imageurl = '';

  /**
   * The link to the page in Notion with the pageid
   */
  @property({ type: String })
  pageurl: string = '';

  /**
   * The page icon when the type is emoji
   */
  @property({ type: String })
  emoji: string = '';

  /**
   * If we can't fetch the page from Notion, we use this to display the error template
   */
  private isError: boolean = false;

  public setError(message: string) {
    this.isError = true;
    this.pagetitle = message;
  }

  render() {
    return this.isError
      ? underConstructionTemplate(this)
      : this.pagetitle !== ''
      ? template(this)
      : waitingTemplate;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notion-page-widget': NotionPageWidget;
  }
}
