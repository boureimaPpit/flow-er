const { renderHead } = require("./head")
const { renderHeader } = require("./header")
const { renderMenu } = require("./menu")
const { renderFooter } = require("./footer")
const { renderCore } = require("./core")

const renderIndex = (context, entity, view, data) => {

    const indexView = context.config[`${entity}/index/${view}`]
    const listView = (indexView.listView) ? (indexView.listView) : "list"
    
    return `<!DOCTYPE html>
    <html lang="fr" data-bs-theme="dark">
    
    <!-- Head -->
    ${renderHead(context, entity, view)}
    
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

        <input type="hidden" id="instanceCaption" value="${context.user.instanceCaption}" />

    <!-- Indicators section-->
    
        <input type="hidden" id="shortcutsRoute" value="/bo/shortcuts/${entity}?view=${view}" />
        <input type="hidden" id="countRoute" value="generic/${entity}/count?view=${view}" />
        <div class="section" id="shortcutsPanel"></div>
    
    <!-- Search section-->
    
        <input type="hidden" id="searchRoute" value="/bo/search/${entity}?view=${view}">
        <div class="section" id="searchPanel"></div>
    
    <!-- List section-->
        
        <input type="hidden" id="listRoute" value="/bo/${listView}/${entity}?view=${view}" />
        <input type="hidden" id="listGroupRoute" value="generic/${entity}/groupUpdate?view=${view}" />
      
        <input type="hidden" id="listWhereHidden" value="${data.where}" />
        <input type="hidden" id="listOrderHidden" value="${data.order}" />
        <input type="hidden" id="listLimitHidden" value="${data.limit}" />
    
        <div class="section" id="listPanel"></div>
    
        <input type="hidden" id="detailRoute" value="/bo/detail/${entity}" />
        <input type="hidden" id="groupRoute" value="bo/group/${entity}" />
    
      </div>
    </div>
    
    <div class="modal fade" id="listDetailModalForm" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="listDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="listDetailModalLabel"></h5>
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
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
   
    <!-- login modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="modalFormLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${context.localize("Login")}</h5>
        </div>
        <div class="modal-body" id="loginPanel">
    
          <?php if ($googleClientId) : ?>
    
            <div class="col-sm-12">
                <div id="buttonDiv"></div> 
            </div>
    
          <?php endif ?>
    
          </div>
        </div>
      </div>
    </div>
    
    <!-- newPassword modal -->
    <div class="modal fade" id="newPasswordModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="modalFormLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${context.localize("New password")}</h5>
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body" id="newPasswordPanel"></div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    ${renderFooter(context)}
    
    </body>

    <!-- Scripts -->
    ${renderCore(context, entity, view)}

    </html>`
}

module.exports = {
    renderIndex
}
