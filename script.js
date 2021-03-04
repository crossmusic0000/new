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
document.getElementById("lyric").style.display = "none";

function home() {
    document.getElementById("home").style.display = "block";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";
    document.getElementById("lyric").style.display = "none";
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
    document.getElementById("lyric").style.display = "none";

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
    document.getElementById("lyric").style.display = "none";
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
    document.getElementById("lyric").style.display = "none";
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
            searchWord({term: word2,limit: 20});
        }else {
            searchWord({term: word1,limit: 20});
            var target2 = document.getElementById("searchFocus2");
            target2.value = word1;
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
            document.getElementById("lyric").style.display = "none";
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
    document.getElementById("lyric").style.display = "none";
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
    document.getElementById("lyric").style.display = "none";

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
    document.getElementById("lyric").style.display = "none";

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
            document.getElementById("lyric").style.display = "none";
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
            var img = sourceStr.replace( regExp , "420x420bb.jpg" );

            html += '<i class="fas fa-arrow-left" style="margin-left: 10px;color: white;font-size: 20px;margin-top: 10px;float: left;" onclick="past_result()"></i><i class="fas fa-ellipsis-h" style="margin-left: 350px;color: white;font-size: 20px;margin-top: 10px;float: left;" id="' + result.trackId + '" onclick="preview_song(this.id)"></i><br><br>';
            html += '<p style="text-align: center;"><img src="' + img + '" style="width: 320px;height: 320px;"></p>';
            html += '<div><h1 style="color: white;text-align: center;">' + result.trackName + '</h1><h3 style="color: rgb(105, 105, 105);text-align: center;margin-top: -15px;">' + result.artistName + '</h3>';
            html += '<div style="text-align: center;margin-top: 5px;"><div class="seek"><div class="fill"></div></div><div class="time">00:00 <span>/</span> 00:00</div>';
            html += '<div class="repeat-btns" style="margin-top: -5px;"><p style="text-align: center;"><span id="' + result.artistName + '" onclick="btn1(this.id)"><i class="fas fa-tv" style="margin:15px;font-size: 20px;"></i></span><span id="' + result.trackId + '" onclick="btn2(this.id)"><i style="margin:15px;font-size: 20px;" class="fas fa-microphone-alt"></i></span><span><button class="play-pause" id="play-pause" onclick="play()" style="margin: 15px"><i class="fa fa-play"></i></button></span><span onclick="btn3()"><i class="fas fa-star" style="margin: 15px;font-size: 20px;"></i></span><span id="' + result.trackViewUrl + '" onclick="btn4(this.id)"><i style="margin: 15px;font-size: 20px;" class="fas fa-download"></i></span></p></div>';
            html += '<br><br><br></div>';
            html += '<audio src="' + result.previewUrl + '" id="audio" style="display: none;" loop></audio>';
        }
        html += '</div>';
    }
    look.innerHTML = html;
}

function preview_song(clicked_id) {
    $("#preview-box").fadeIn("normal"); 

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
            thisPreviewSong(json);
        }
    });
}

function thisPreviewSong(json) {
    if (json.results.length != 0) {
        html  = '<div>';
              
        for (var i = 0, len = json.results.length; i < len; i++) {
            var result = json.results[i];
            var previewBox = document.getElementById("preview-box"); 
            var sourceStr = result.artworkUrl100;
            var targetStr = "100x100bb.jpg";
            var regExp = new RegExp( targetStr, "g" ) ;
            var img = sourceStr.replace( regExp , "250x250bb.jpg" );

            html += '<i class="fas fa-times" style="margin-left: 10px;color: white;font-size: 15px;margin-top: 10px;" onclick="not_preview_song()"></i><p style="color: white;text-align: center;margin-top: 10px;font-size: 25px;">' + result.trackName + '</p>';
            html += '<p style="text-align: center;margin-top: 10px;"><img src="' + img + '" style="width: 150px;height: 150px;"></p>';
            html += '<p style="text-align: center;">アーティスト名：　' + result.artistName + '</p>';
            html += '<p style="text-align: center;">収録アルバム：　' + result.collectionName + '</p>';
            html += '<p style="text-align: center;">ID：　' + result.trackId + '</p>';
            html += '<p style="text-align: center;">発売日：　'  + result.trackHdPrice + '</p>';
            html += '<p style="text-align: center;">価格：　' + result.trackPrice + '円</p>';
        }
        html += '</div>';
    }
    previewBox.innerHTML = html;
}

function not_preview_song() {
    $("#preview-box").fadeOut("normal"); 
}

function play() {
    const audio = document.getElementById("audio");
    const playPause  = document.getElementById("play-pause");
    let fillbar = document.querySelector(".fill");
    let currentTime = document.querySelector(".time");

    if (! audio.paused ) {
        playPause.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    } else {
        playPause.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }
    audio.addEventListener("timeupdate", function() {
        let position = audio.currentTime / audio.duration;
        fillbar.style.width = position * 100 + "%";
        convertTime(Math.round(audio.currentTime));
    });

    function convertTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        currentTime.textContent = min + ":" + sec;
        totalTime(Math.round(audio.duration));
    }
      
    function totalTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        currentTime.textContent += " / " + min + ":" + sec;
    }

    audio.addEventListener("ended", ()=>{
        audio.currentTime = 0;
        playPause.innerHTML = '<i class="fas fa-play"></i>';
    });
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
    document.getElementById("lyric").style.display = "none";

    search_related({term: clicked_id,limit: 20});
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
    document.getElementById("lyric").style.display = "none";
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

function btn2(clicked_id) {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("library").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("look").style.display = "none";
    document.getElementById("related").style.display = "none";
    document.getElementById("lyric").style.display = "block";

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
            thisLyricSong(json);
        }
    });
}

function thisLyricSong(json) {
    if (json.results.length != 0) {
        html  = '<div>';
              
        for (var i = 0, len = json.results.length; i < len; i++) {
            var result = json.results[i];
            var lyric = document.getElementById("lyric"); 
            var sourceStr = result.artworkUrl100;
            var targetStr = "100x100bb.jpg";
            var regExp = new RegExp( targetStr, "g" ) ;
            var img = sourceStr.replace( regExp , "70x70bb.jpg" );

            html += '<i class="fas fa-times" style="margin-left: 10px;color: white;font-size: 15px;margin-top: 10px;" onclick="past_look()"></i>';
            html += '<div><p><img src="' + img + '" style="width: 70px;height: 70px;margin-left: 10px;margin-top: 5px;"></p>';
            html += '<h4 style="margin-left: 100px;margin-top: -90px;">' + result.trackName + '</h4>';
            html += '<p style="color: rgb(105, 105, 105);margin-left: 100px;margin-top: -13px;">' + result.artistName + '</p></div>';
            html += '<div style="margin-top: 40px;margin-left: 10px;"><h1 style="color: white;">歌詞を取得できませんでした。</h1>';
            html += '<h4 style="text-align: center;color: rgb(105, 105, 105);margin-top: 100px;">&copy;By Crossnet</h4></div>';
        }
        html += '</div>';
    }
    lyric.innerHTML = html;
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
