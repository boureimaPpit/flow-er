const { renderHeadB5 } = require("./renderHeadB5")
const { renderHeader } = require("./renderHeader")
const { renderMenu } = require("./renderMenu")
const { renderFooter } = require("./renderFooter")
const { renderCoreB5 } = require("./renderCoreB5")

const renderIndexB5 = (context, entity, view, data) => {
    const indexView = context.config[`${entity}/index/${view}`]
    const listView = (indexView && indexView.listView) ? (indexView.listView) : "dataview"
    
    return `<!DOCTYPE html>
    <html lang="fr" ${ (context.config[`tab/${view}`] && context.config[`tab/${view}`].darkMode) ? "data-bs-theme=\"dark\"" : "" }>
    
    <!-- Head -->
    ${renderHeadB5(context, entity, view)}
    
    <body>
    
      <!-- Header -->
      <div id="headerDiv">
          ${renderHeader(context, entity, view)}
      </div>
    
    <div class="card">

      <div class="card-header">
          ${renderMenu(context, entity, view)}
      </div>

      <div class="card-body">

        <input type="hidden" id="instanceCaption" value="${context.instance.caption}" />

    <!-- Indicators section-->
    
        <input type="hidden" id="shortcutsRoute" value="/bo/shortcuts/${entity}?view=${view}" />
        <input type="hidden" id="countRoute" value="generic/${entity}/count?view=${view}" />
        <div class="section" id="shortcutsPanel"></div>
    
    <!-- Search section-->
    
        <input type="hidden" id="searchRoute" value="/bo/search/${entity}?view=${view}">
        <div class="section" id="searchPanel"></div>
    
    <!-- List section-->
        
        <input type="hidden" id="listRoute" value="/bo/${listView}/${entity}?view=${view}" />
        <input type="hidden" id="listHeaderRoute" value="/bo/listHeaderB5/${entity}?view=${view}" />
        <input type="hidden" id="listGroupRoute" value="generic/${entity}/groupUpdate?view=${view}" />
      
        <input type="hidden" id="listWhereHidden" value="${data.where}" />
        <input type="hidden" id="listOrderHidden" value="${data.order}" />
        <input type="hidden" id="listLimitHidden" value="${data.limit}" />
    
        <div class="section" id="dataView"></div>
    
        <input type="hidden" id="detailRoute" value="/bo/detail/${entity}" />
        <input type="hidden" id="groupRoute" value="bo/group/${entity}" />
    
      </div>
    </div>
    
    <div class="modal fade" id="listDetailModalForm" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="listDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="listDetailModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}"></button>
          </div>
          <div class="modal-body" id="listDetailModal">
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="groupModalForm" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="listGroupModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${context.localize("Grouped actions")}</h5>
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body" id="groupModal">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    ${renderFooter(context)}
    
    </body>

    <!-- Scripts -->
    ${renderCoreB5(context, entity, view)}

    </html>`
}

module.exports = {
    renderIndexB5
}
