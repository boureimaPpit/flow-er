const { renderListHeader } = require("./renderListHeader")

const renderDataview = (context, entity, view, orderParam, limit, measure, listConfig, properties) => {

    return `<style>
    table td { 
        font-size: 0.9rem;
    }
    </style>
    <div class="row">
        <div class="table-responsive">
            <div class="col-md-12">
                <table class="table table-sm table-hover" id="listPanel">
                    <thead class="table-light">
                        ${ renderListHeader(context, entity, view, measure, orderParam, properties) }
                    </thead>
                    <tbody class="table-group-divider" id="listTbody"></tbody>
                </table>
            </div>
        </div>
    </div>`
}

module.exports = {
    renderDataview
}
