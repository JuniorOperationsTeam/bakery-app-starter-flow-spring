import { html, css, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import './order-status-badge.js'; // Componente personalizado para mostrar o estado da encomenda
import { sharedStyles } from '../../../styles/shared-styles.js';

/**
 * Componente <order-card>
 * Representa um cartão que exibe as informações principais de uma encomenda,
 * incluindo estado, hora/local, cliente e produtos.
 */
class OrderCard extends LitElement {
  /**
   * Estilos aplicados ao componente.
   * Inclui estilos partilhados e regras específicas do cartão.
   */
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: block;
        }

        .content {
          display: block;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .wrapper {
          background: var(--lumo-base-color);
          background-image: linear-gradient(
            var(--lumo-tint-5pct),
            var(--lumo-tint-5pct)
          );
          box-shadow: 0 3px 5px var(--lumo-shade-10pct);
          border-bottom: 1px solid var(--lumo-shade-10pct);
          display: flex;
          padding: var(--lumo-space-l) var(--lumo-space-m);
          cursor: pointer;
        }

        .main {
          color: var(--lumo-secondary-text-color);
          margin-right: var(--lumo-space-s);
          font-weight: bold;
        }

        .group-heading {
          margin: var(--lumo-space-l) var(--lumo-space-m) var(--lumo-space-s);
        }

        .secondary {
          color: var(--lumo-secondary-text-color);
        }

        .info-wrapper {
          display: flex;
          flex-direction: column-reverse;
          justify-content: flex-end;
        }

        .badge {
          margin: var(--lumo-space-s) 0;
          width: 100px;
        }

        .time-place {
          width: 120px;
        }

        .name-items {
          flex: 1;
        }

        .place,
        .secondary-time,
        .full-day,
        .goods {
          color: var(--lumo-secondary-text-color);
        }

        .time,
        .name,
        .short-day,
        .month {
          margin: 0;
        }

        .name {
          word-break: break-all;
          word-break: break-word; /* compatibilidade */
          white-space: normal;
        }

        .goods {
          display: flex;
          flex-wrap: wrap;
        }

        .goods > div {
          box-sizing: border-box;
          width: 18em;
          flex: auto;
          padding-right: var(--lumo-space-l);
        }

        .goods-item {
          display: flex;
          align-items: baseline;
          font-size: var(--lumo-font-size-s);
          margin: var(--lumo-space-xs) 0;
        }

        .goods-item > .count {
          margin-right: var(--lumo-space-s);
          white-space: nowrap;
        }

        .goods-item > div {
          flex: auto;
          word-break: break-all;
          word-break: break-word;
          white-space: normal;
        }

        @media (min-width: 600px) {
          .info-wrapper {
            flex-direction: row;
          }

          .wrapper {
            border-radius: var(--lumo-border-radius);
          }

          .badge {
            margin: 0;
          }

          .content {
            max-width: 964px;
          }
        }
      `,
    ];
  }

  /**
   * Renderização do componente (template).
   * Estrutura:
   * - Cabeçalho opcional (header)
   * - Wrapper clicável com:
   *    - Estado da encomenda e informações de tempo/local
   *    - Nome do cliente e lista de artigos encomendados
   */
  render() {
    return html`
      <div class="content">
        <!-- Cabeçalho de grupo, aparece apenas se existir -->
        <div class="group-heading" ?hidden="${!this.header}">
          <span class="main">${this.header && this.header.main}</span>
          <span class="secondary">${this.header && this.header.secondary}</span>
        </div>

        <!-- Corpo do cartão, clicável -->
        <div class="wrapper" @click="${this._cardClick}">
          <div class="info-wrapper">
            <!-- Badge de estado da encomenda -->
            <order-status-badge
              class="badge"
              .status="${this.orderCard && this.orderCard.state}"
            ></order-status-badge>

            <!-- Informações temporais e local -->
            <div class="time-place">
              <h3 class="time">${this.orderCard && this.orderCard.time}</h3>
              <h3 class="short-day">
                ${this.orderCard && this.orderCard.shortDay}
              </h3>
              <h3 class="month">${this.orderCard && this.orderCard.month}</h3>
              <div class="secondary-time">
                ${this.orderCard && this.orderCard.secondaryTime}
              </div>
              <div class="full-day">
                ${this.orderCard && this.orderCard.fullDay}
              </div>
              <div class="place">${this.orderCard && this.orderCard.place}</div>
            </div>
          </div>

          <!-- Nome do cliente e lista de artigos -->
          <div class="name-items">
            <h3 class="name">${this.orderCard && this.orderCard.fullName}</h3>

            <div class="goods">
              <!-- Iteração sobre os produtos da encomenda -->
              ${map(
        this.orderCard && this.orderCard.items,
        (item) => html`
                  <div class="goods-item">
                    <span class="count">${item.quantity}</span>
                    <div>${item.product.name}</div>
                  </div>
                `
    )}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Declaração de propriedades observáveis.
   * - orderCard: objeto com dados da encomenda
   * - header: cabeçalho opcional
   * - item: não parece ser usado diretamente aqui
   */
  static get properties() {
    return {
      orderCard: { type: Object },
      header: { type: Object },
      item: { type: Object },
    };
  }

  /** Nome do componente customizado */
  static get is() {
    return 'order-card';
  }

  /**
   * Evento disparado ao clicar no cartão.
   * Útil para interações (ex: abrir detalhes da encomenda).
   */
  _cardClick() {
    this.dispatchEvent(new CustomEvent('card-click'));
  }
}

// Registo do elemento customizado
customElements.define(OrderCard.is, OrderCard);
