// This properly blocks Buzzfeed from AJAX-generated pages. It's hacky, but
// we leverage Javascript's own libraries to determine if an AJAX request, when
// finished, has a "search" property (basically, the parameters that follow the
// ? in a URL). Facebook tags their AJAX-returned posts with 'ajaxpipe=1', so
// we can snipe that.
//
// In short: we want to trigger our blocker code when a new page is loaded
// from AJAX, but not when an old page is updated from AJAX.
chrome.webRequest.onCompleted.addListener(function(details) {
    var url = document.createElement('a');
    url.href = details.url;
    if (url.search && url.search.indexOf('ajaxpipe=1') !== -1) {
        console.log('New page via AJAX.');
        chrome.tabs.executeScript({'file' : 'blocker.js'});
    }
}, {urls : ["*://*.facebook.com/*"]});
