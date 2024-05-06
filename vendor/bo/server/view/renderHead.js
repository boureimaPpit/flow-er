
const renderHead = (context, entity, view) => {
    return `
    <head>
      <title>${context.localize(context.config[`tab/${view}`].labels)}</title>
      <meta charset="utf-8">
      <meta name="robots" content="noindex, nofollow">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">-->
      <!--<link rel="stylesheet" href="/bo/cli/resources/bootstrap-select-1.13.1/dist/css/bootstrap-select.min.css">-->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <link rel="stylesheet" href="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.css">
      <link rel="stylesheet" href="/bo/cli/resources/jquery.timepicker/jquery.timepicker.css">
      <link rel="stylesheet" href="/bo/cli/resources/toastr/build/toastr.min.css" rel="stylesheet" />
      <link rel='stylesheet' href="/bo/cli/resources/json-viewer/jquery.json-viewer.css" />
      <link rel='stylesheet' href="/bo/cli/resources/fullcalendar/fullcalendar.css" />
    
    <style>
    .chip {
      display: inline-block;
      padding: 0 10px;
      height: 25px;
      font-size: 11px;
      line-height: 25px;
      border-radius: 25px;
    }

    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
    }
    </style>

    </head>`
}

module.exports = {
    renderHead
}
