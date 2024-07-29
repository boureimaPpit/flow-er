const renderBody = (context, entity, view, data) => {

    return `
    
      <!-- Header -->
      <div id="headerDiv">
          ${renderHeader(context, data)}
      </div>
    
    <div class="card">

      <div class="card-header">
          ${renderMenu(context, entity, view, data.menu)}
      </div>

      <div class="card-body">

        <input type="hidden" id="instanceCaption" value="${data.instance.caption}" />

    <!-- Indicators section-->
    
        <input type="hidden" id="shortcutsRoute" value="/bo/shortcuts/${entity}?view=${view}" />
        <input type="hidden" id="countRoute" value="/bo/v1/${entity}/count" />
        <div class="section" id="shortcutsPanel"></div>
    
    <!-- List section-->
        
        <input type="hidden" id="listRoute" value="${ (data.indexConfig && data.indexConfig.listView) ? data.indexConfig.listView : "/bo/dataview" }/${entity}?view=${view}" />
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
    ${renderFooter(context, data.footer)}`
}
