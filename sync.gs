// Cooresponding script for google spreadsheet
// set the cacheChanges function as a trigger on spreadsheet change

function cacheChanges() {
  options =
    {
      "method" : "get",
    };
  UrlFetchApp.fetch("http://api.ieeeatuhm.com/events-sync", options);
}
