import { html, css, LitElement } from 'lit';

/**
 * DashboardCounterLabel
 *
 * Componente Web que representa um rótulo de contador em um painel (dashboard).
 *
 * Este componente exibe:
 * - Um slot para um gráfico ou visualização na parte superior.
 * - Um contador em destaque (grande).
 * - Um título e subtítulo opcionais abaixo do contador.
 *
 * O estilo pode variar de acordo com a classe aplicada ao host:
 * - `green` → contador em verde
 * - `red` → contador em vermelho
 * - `blue` → contador em azul
 * - `gray` → contador em cinza
 *
 * Exemplos de uso:
 * ```html
 * <dashboard-counter-label class="green">
 *   <!-- Slot para gráfico -->
 *   <my-chart></my-chart>
 * </dashboard-counter-label>
 * ```
 *
 * @element dashboard-counter-label
 * @slot - Conteúdo gráfico exibido no topo (ex.: um gráfico).
 * @csspart count-digit - Dígito do contador.
 * @csspart subtitle - Subtítulo do contador.
 */
class DashboardCounterLabel extends LitElement {
    /**
     * Estilos aplicados ao componente.
     *
     * @returns {CSSResult} Regras CSS customizadas para o componente.
     */
    static get styles() {
        return css`
            :host {
                position: relative;
                text-align: center;
                height: calc(18vh - 64px);
                min-height: 180px;
                display: block;
            }

            :host(.green) .count-digit {
                color: #55bf3b;
            }

            :host(.red) .count-digit {
                color: #ff473a;
            }

            :host(.blue) .count-digit {
                color: #1877f3;
            }

            :host(.gray) .count-digit {
                color: rgba(45, 71, 105, 0.7);
            }

            .content {
                padding: 10px;
            }

            .count-wrapper {
                display: block;
                text-align: center;
                padding-top: 12px;
                margin-bottom: 18px;
            }

            .count-digit {
                font-size: 44px;
            }

            .subtitle {
                color: var(--lumo-secondary-text-color);
                font-size: 14px;
            }

            h4 {
                margin: 0;
            }

            .chart-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                height: 120px;
                width: 100%;
            }
        `;
    }

    /**
     * Renderiza a estrutura HTML do componente.
     *
     * @returns {TemplateResult} Estrutura HTML renderizada.
     */
    render() {
        return html`
            <div class="chart-wrapper">
                <slot></slot>
            </div>

            <div class="content">
                <div class="count-wrapper">
                    <span id="count" class="count-digit"></span>
                </div>

                <h4 id="title"></h4>
                <div id="subtitle" class="subtitle"></div>
            </div>
        `;
    }

    /**
     * Nome do elemento customizado.
     *
     * @returns {string} Nome da tag HTML associada ao componente.
     */
    static get is() {
        return 'dashboard-counter-label';
    }
}

// Regista o elemento customizado no navegador
customElements.define(DashboardCounterLabel.is, DashboardCounterLabel);
