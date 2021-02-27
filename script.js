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

$("#search-btn").click(function() {
    var searchForm = document.getElementById("search-form") ;
    searchForm.id = "searchFocus" ;
    var searchBtn = document.getElementById("search-btn") ;
    searchBtn.id = "searchFocus1" ;
});

document.getElementById("home").style.display = "block";
document.getElementById("search").style.display = "none";
document.getElementById("library").style.display = "none";
document.getElementById("premium").style.display = "none";
document.getElementById("question").style.display = "block";
document.getElementById("result").style.display = "none";
document.getElementById("look").style.display = "none";
document.getElementById("related").style.display = "none";

function home() {
    document.getElementById("home").style.display = "block";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";
}
function search() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "block";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";

    var target2 = document.getElementById("searchFocus2");
    target2.value = "";
}
function library() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "block";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";
}
function premium() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "block";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";
}


document.onkeypress = enter;
function enter(){
    if( window.event.keyCode == 13 ){
        var target1 = document.getElementById("searchFocus1");
        var word1 = target1.value;
        target1.value = "";
        if(word1 == "") {
            var target2 = document.getElementById("searchFocus2");
            var word2 = target2.value;
            searchWord({term: word2,limit: 15});
        }else {
            searchWord({term: word1,limit: 15});
        }
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
            document.getElementById("look").style.display = "none";
            document.getElementById("related").style.display = "none";
            document.getElementById("result1").innerHTML = '<p style="margin-left: 10px;margin-top: 20px;">インターネット接続がありません。</p>';
        }
    });
};

function past_result() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "block";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";
}
        
function showData(json) {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "block";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";

    if (json.results.length != 0) {
        var result1 = document.getElementById("result1");
        html  = '<h2 style="margin-left: 10px;margin-top: 20px;">検索結果</h2>';
                
        for (var i = 0, len = json.results.length; i < len; i++) {
            var resultWord = json.results[i];
        
            html += '<div style="width: 96%;height: 80px;margin-left: 2%;margin-top: 10px;" id=' + resultWord.trackId + ' onclick="view(this.id)">';
            html += '<img style="width: 80px;height: 80px;" src="' + resultWord.artworkUrl100 + '" class="itunes-embed-image"/><br>';
            html += '<div style="margin-left: 110px;margin-top: -100px;"><h4 class="itunes-embed-artist" style="font-weight: 90;">' + resultWord.trackName + '</h4>';
            html += '<h4 style="color: rgb(105, 105, 105);margin-top: -15px;font-weight: 90;">' + resultWord.artistName + '</h4>';
            html += '</div></div>';
        }
    }
    result1.innerHTML = html;
}

function view(clicked_id) {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "block";
    document.getElementById("related").style.display = "none";

    var view_song = 'https://itunes.apple.com/lookup?id=' + clicked_id;
    var parts = {
        lang: 'ja_jp',
        entry: 'music',
        media: 'music',
        country: 'JP',
    };

    $.ajax({
        url: view_song,
        method: 'GET',
        data: parts,
        dataType: 'jsonp',
                
        success: function(json) {
            looks(json);
        },
        error:function () {
            document.getElementById("home").style.display = "none";
            document.getElementById("search").style.display = "none";
            document.getElementById("library").style.display = "none";
            document.getElementById("premium").style.display = "none";
            document.getElementById("question").style.display = "none";
            document.getElementById("result").style.display = "none";
            document.getElementById("look").style.display = "block";
            document.getElementById("related").style.display = "none";
            document.getElementById("look").innerHTML = '<i onclick="past_result()" class="fas fa-arrow-left" title="戻る" style="margin-left: 10px;margin-top: 10px;color: left;font-size: 20px;"></i><p style="color: white;margin-left: 10px;margin-top: 20px;">インターネット接続がありません。</p>';
        }
    });
}

function looks(json) {
    if (json.results.length != 0) {
        html  = '<div>';
              
        for (var i = 0, len = json.results.length; i < len; i++) {
            var result = json.results[i];
            var look = document.getElementById("look"); 
            var sourceStr = result.artworkUrl100;
            var targetStr = "100x100bb.jpg";
            var regExp = new RegExp( targetStr, "g" ) ;
            var img = sourceStr.replace( regExp , "350x350bb.jpg" );
            var img_big = sourceStr.replace( regExp , "1000x1000bb.jpg");
            //document.getElementById("look").style.backgroundImage = 'url(' + img_big + ')';

            html += '<i class="fas fa-arrow-left" title="戻る" style="margin-left: 10px;color: white;font-size: 20px;margin-top: 10px;" onclick="past_result()"></i><br><br>';
            html += '<p style="text-align: center;"><img src="' + img + '" style="width: 300px;height: 300px;"></p>';
            html += '<div><h1 style="color: white;text-align: center;">' + result.trackName + '</h1><h3 style="color: rgb(105, 105, 105);text-align: center;margin-top: -15px;">' + result.artistName + '</h3>';
            html += '<div style="text-align: center;margin-top: 5px;"><div class="seek"><div class="fill"></div></div><div class="time">00:00 <span>/</span> 00:00</div>';
            html += '<div class="repeat-btns" style="margin-top: -5px;"><p style="text-align: center;"><span id="' + result.artistName + '" onclick="btn1(this.id)"><i class="fas fa-tv" style="margin:15px;font-size: 20px;" title="関連曲"></i></span><span onclick="btn2()"><i style="margin:15px;font-size: 20px;" class="fas fa-microphone-alt" title="歌詞"></i></span><span><button class="play-pause" id="' + result.trackId + '" style="margin: 15px"><i title="再生" class="fa fa-play"></i></button></span><span onclick="btn3()"><i title="お気に入り" class="fas fa-star" style="margin: 15px;font-size: 20px;"></i></span><span id="' + result.trackViewUrl + '" onclick="btn4(this.id)"><i style="margin: 15px;font-size: 20px;" title="ダウンロード" class="fas fa-download"></i></span></p></div>';
            html += '<br><br><br></div>';
        }
        html += '</div>';
    }
    look.innerHTML = html;
}

function btn1(clicked_id) {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "block";

    search_related({term: clicked_id,limit: 15});
}

var search_related = function getInfo(options) {
    var parts = {
        lang: 'ja_jp',
        entry: 'music',
        media: 'music',
        country: 'JP',
    };
        
    if (options && options.term) {
        parts.term = options.term;
    }
        
    if (options && options.limit) {
        parts.limit = options.limit;
    }
          
    $.ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        data: parts,
        dataType: 'jsonp',
            
        success: function(json) {
            shows_related(json);
        }
    });
}

function past_look() {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "block";
    document.getElementById("related").style.display = "none";
}

function shows_related(json) {
    if (json.results.length != 0) {
        var related = document.getElementById("related");
        html  = '<i class="fas fa-arrow-left" title="戻る" style="margin-left: 10px;color: white;font-size: 20px;margin-top: 10px;" onclick="past_look()"></i><br><br><h2 style="margin-left: 10px;margin-top: 10px;">関連曲</h2>';
                
        for (var i = 0, len = json.results.length; i < len; i++) {
            var resultWord = json.results[i];
        
            html += '<div style="width: 96%;height: 80px;margin-left: 2%;margin-top: 10px;" id=' + resultWord.trackId + ' onclick="view(this.id)">';
            html += '<img style="width: 80px;height: 80px;" src="' + resultWord.artworkUrl100 + '" class="itunes-embed-image"/><br>';
            html += '<div style="margin-left: 110px;margin-top: -100px;"><h4 class="itunes-embed-artist" style="font-weight: 90;">' + resultWord.trackName + '</h4>';
            html += '<h4 style="color: rgb(105, 105, 105);margin-top: -15px;font-weight: 90;">' + resultWord.artistName + '</h4>';
            html += '</div></div>';
        }
    }
    related.innerHTML = html;
}

function btn3() {
    $("#errorbox").fadeIn("slow"); 
    setTimeout(countUp, 4000);
}

function countUp() {
    $("#errorbox").fadeOut("slow");
}

function btn4(clicked_id) {
    window.open(clicked_id, '_blank');
}
