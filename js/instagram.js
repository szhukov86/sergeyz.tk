/*
 Simple Instagram gallery loader.
 - Tries server-side proxy at /inc/instagram.php (recommended)
 - Fallbacks to client-side call to Instagram Basic Display API if you set window.INSTAGRAM_TOKEN
 - Filters posts by keywords (cars, bicycle, activity, etc.) and only displays images

 USAGE:
 - Option A (recommended): place a long-lived access token in inc/instagram.php and the
   client will call that proxy to fetch media.
 - Option B: set `window.INSTAGRAM_TOKEN = 'YOUR_TOKEN'` in a script before this file.
*/
(function(){
  'use strict';

  var keywords = ['car','cars','bicycle','bike','biking','cycling','ride','rides','motor','activity','activities'];
  var loader = document.getElementById('insta-loading');
  var wrapper = document.getElementById('folio-wrapper');

  function containsKeyword(text){
    if(!text) return false;
    var t = text.toLowerCase();
    return keywords.some(function(k){ return t.indexOf(k) !== -1; });
  }

  function renderItems(items){
    if(loader) loader.style.display='none';
    if(!items || !items.length){
      wrapper.innerHTML = '<p>No matching Instagram posts found.</p>';
      return;
    }
    var html = '';
    items.forEach(function(m){
      var img = m.media_url || m.thumbnail_url || '';
      var caption = m.caption || '';
      var title = caption.split('\n')[0] || '';
      html += '<div class="bgrid folio-item">\n';
      html += '  <div class="item-wrap">\n';
      html += '    <img src="'+img+'" alt="'+(title||'Instagram photo')+'">\n';
      html += '    <a href="'+(m.permalink||'#')+'" class="overlay" target="_blank">\n';
      html += '      <div class="folio-item-table">\n';
      html += '        <div class="folio-item-cell">\n';
      html += '          <h3 class="folio-title">'+(title||'Instagram')+'</h3>\n';
      html += '          <span class="folio-types">Instagram</span>\n';
      html += '        </div>\n';
      html += '      </div>\n';
      html += '    </a>\n';
      html += '  </div>\n';
      html += '</div>\n';
    });
    wrapper.innerHTML = html;
  }

  function clientFetch(token){
    var url = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,thumbnail_url&limit=50&access_token=' + encodeURIComponent(token);
    fetch(url).then(function(r){ return r.json(); }).then(function(data){
      if(!data || !data.data){ renderItems([]); return; }
      var filtered = data.data.filter(function(it){
        if(!it.media_url) return false;
        if(it.media_type && it.media_type !== 'IMAGE' && it.media_type !== 'CAROUSEL_ALBUM') return false;
        return containsKeyword(it.caption || '');
      });
      renderItems(filtered);
    }).catch(function(){ renderItems([]); });
  }

  function manifestFetch(){
      // Prefer pre-generated manifest (created locally or by CI). If missing, show a message.
      fetch('/data/instagram.json').then(function(r){
        if(!r.ok) throw new Error('no manifest');
        return r.json();
      }).then(function(data){
        if(!data || !data.data) { throw new Error('invalid'); }
        // Normalize manifest entries to match expected structure
        var mapped = data.data.map(function(it){
          return { media_url: it.file, caption: it.caption, permalink: it.permalink };
        });
        renderItems(mapped);
      }).catch(function(){
        // No manifest available — inform user and render empty result
        renderItems([]);
      });
  }

  // Start: prefer site-managed manifest (keeps tokens out of repository)
  manifestFetch();

})();
