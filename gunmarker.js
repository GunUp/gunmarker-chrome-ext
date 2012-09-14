;(function(d, undefined){
  var context = d.body, ctxParagraphs = [], ctxConditions = false
  //@todo: fetch postMarkers data remotely, like:
  //  https://gist.github.com/3722306/
  , postMarkers = ['mock-marker-class', 'post'], pmLen = postMarkers.length
  , ELM_NODE = 1;//, TXT_NODE = 3, HTML_COMMENT_NODE = 8;

  function has(ctx, cls) {
    var clsRx = new RegExp('(^|\\s)' + cls + '(\\s|$)');
    return ctx.className && clsRx.test(ctx.className);
  }

  function seek(ctx) {
    if (ctxConditions) return;

    var tryClass = arguments[1] ? arguments[1] : false
    , isElement = ctx.nodeType == ELM_NODE
    , isClassed = has(ctx, tryClass);

    ctxConditions = isElement && tryClass && isClassed;

    if ( ctxConditions ) {// found classy context; GTFO!
      ctxParagraphs = ctx.getElementsByTagName('p');
      return;
    }
    else {//recurse (walk the DOM)
      for (var i=0, l = ctx.childNodes.length; i < l; ++i) {
        switch (ctx.childNodes[i].nodeName.toLowerCase()) {
          case 'div':
            seek(ctx.childNodes[i], tryClass);
            break;
        }
      }
    }
  }

  // seek known content #id markers...
  // @todo

  // seek known content .class markers...
  while (pmLen--) {
    seek(context, postMarkers[pmLen]);
  }

  // if no narrower context was discovered, get all <p>'s:
  if (ctxParagraphs.length == 0) {
    ctxParagraphs = context.getElementsByTagName('p');
  }

  var pLen = ctxParagraphs.length;
  while(pLen--) {// do shit!
    ctxParagraphs[pLen].style.textDecoration = 'line-through';
    ctxParagraphs[pLen].style.backgroundColor = '#FF99FF';
  }
}(document));
