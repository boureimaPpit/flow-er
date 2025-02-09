const renderBody12 = ({ context, entity, view }, data) => {

    return `
    
      <!-- Header -->
      <div id="headerDiv">
          ${renderHeader({ context, entity, view }, data)}
      </div>
    
    <div class="m-3">

      <div class="row">

          ${renderMenu({ context, entity, view }, data)}
      
      </div>

      <div class="row">

        <input type="hidden" id="instanceCaption" value="${data.instance.caption}" />

    <!-- Indicators section-->
    
        <input type="hidden" id="shortcutsRoute" value="/bo/shortcuts/${entity}?view=${view}" />
        <input type="hidden" id="countRoute" value="/bo/v1/${entity}/count" />
        <div class="section mt-3" id="shortcutsPanel"></div>
    
    <!-- Search section-->
        
        <input type="hidden" id="searchRoute" value="${ (data.indexConfig && data.indexConfig.searchView) ? data.indexConfig.searchView : "/bo/search" }/${entity}?view=${view}" />
    
    <!-- List section-->
        
        <input type="hidden" id="listRoute" value="${ (data.indexConfig && data.indexConfig.listView) ? data.indexConfig.listView : "/bo/list" }/${entity}?view=${view}" />
        <input type="hidden" id="listGroupRoute" value="generic/${entity}/groupUpdate?view=${view}" />
      
        <input type="hidden" id="listWhereHidden" value="${data.where}" />
        <input type="hidden" id="listOrderHidden" value="${data.order}" />
        <input type="hidden" id="listLimitHidden" value="${data.limit}" />
    
        <div class="section" id="dataview"></div>
    
        <input type="hidden" id="detailRoute" value="/bo/detail/${entity}" />
        <input type="hidden" id="groupRoute" value="bo/group/${entity}" />
    
      </div>
    </div>
    
    <div class="modal fade" id="listDetailModalForm" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="listDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="listDetailModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" data-mdb-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}"></button>
          </div>
          <div class="modal-body" id="listDetailModal">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    ${renderFooter({ context, entity, view }, data)}`
}
