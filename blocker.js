var hidePost = function(domClass, post) {
    var tgt = $(domClass, post);
    if (tgt.attr('href') !== undefined &&
        tgt.attr('href').indexOf('buzzfeed.com') !== -1) {
        console.log('BUZZFEED DETECTED: ' + tgt.attr('href'));
        post.remove();
    }
}

// grabs initially loaded elements
$(document).ready(function() {
    var posts = $('[class^="uiUnifiedStory"]');
    posts.each(function(i, post) {
        hidePost('.pam.shareText', post);
    });

    var posts = $('[class^="fbTimelineUnit"]');
    posts.each(function(i, post) {
        hidePost('.shareLink', post);
    });
});

// grabs inifinite scroll-loaded elements
$('ul[class*="uiStream"]').on('DOMNodeInserted', '.uiUnifiedStory', function(e) {
    hidePost('.pam.shareText', $(e.target));
});
