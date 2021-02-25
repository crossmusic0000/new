$(function() {
    var $clickable = $('.ripple');

    $clickable.on('mousedown', function(e) {
        var _self   = this;
        var x       = e.offsetX;
        var y       = e.offsetY;

        var $effect = $(_self).find('.ripple__effect');
        var w       = $effect.width();
        var h       = $effect.height();

        $effect.css({
            left: x - w / 2,
            top: y - h / 2
        });

        if (!$effect.hasClass('is-show')) {
            $effect.addClass('is-show');
            setTimeout(function() {
                $effect.removeClass('is-show');
            }, 750);
        }
        return false;
    });

});

document.getElementById("home").style.display = "block";
document.getElementById("search").style.display = "none";
document.getElementById("library").style.display = "none";
document.getElementById("premium").style.display = "none";
document.getElementById("question").style.display = "block";
document.getElementById("result").style.display = "none";

function home() {
    document.getElementById("home").style.display = "block";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
}
function search() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "block";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
}
function library() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "block";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
}
function premium() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "block";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
}


document.onkeypress = enter;
function enter(){
    if( window.event.keyCode == 13 ){
        var target = document.getElementById("search-btn");
        var word = target.value;
        searchWord({term: word,limit: 20});
    }
}


var searchWord = function getInfo(options) {
    var params = {
        lang: 'ja_jp',
        entry: 'music',
        media: 'music',
        country: 'JP',
    };
        
    if (options && options.term) {
        params.term = options.term;
    }
        
    if (options && options.limit) {
        params.limit = options.limit;
    }
          
    $.ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        data: params,
        dataType: 'jsonp',
            
        success: function(json) {
            showData(json);
        },

        error:function () {
            document.getElementById("home").style.display = "none";
            document.getElementById("search").style.display = "block";
            document.getElementById("library").style.display = "none";
            document.getElementById("premium").style.display = "none";
            document.getElementById("question").style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("result").innerHTML = '<p style="margin-left: 10px;margin-top: 20px;">インターネット接続がありません。</p>';
        }
    });
};
        
function showData(json) {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "block";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "block";
    if (json.results.length != 0) {//length
        var result = document.getElementById("result");
        html  = '<h2 style="margin-left: 10px;margin-top: 20px;">検索結果</h2>';
                
        for (var i = 0, len = json.results.length; i < len; i++) {//length
            var resultWord = json.results[i];
        
            html += '<div style="width: 96%;height: 110px;margin-left: 2%;margin-top: 10px;background: #419be0;">';
            html += '<a href="' + resultWord.trackViewUrl + '&amp;at=アフィリエイト・トークン" rel="nofollow" target="_blank">';
            html += '<img style="width: 110px;height: 110px;" src="' + resultWord.artworkUrl100 + '" class="itunes-embed-image"/></a><br>';
            html += '<h4 class="itunes-embed-artist">' + resultWord.trackName + '</h4>';
            html += '<h4 style="color: rgb(105, 105, 105);">' + resultWord.artistName + '</h4></div>';
            //html += '<button id="' + resultWord.trackId + '" style="width: 20%;height: 40px;font-size: 20px;color: white;background: rgb(32, 147, 201);outline: none;border: none;border-radius: 5px;cursor: pointer;">視聴する</button></div><br>'
        }
    }
    result.innerHTML = html;
}
