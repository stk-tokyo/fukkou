//グローバル変数 八幡浜の座標
lng = 132.423387;
lat = 33.462873;

// GeoLocation APIに対応している場合
if( navigator.geolocation ){
    //現在位置取得
    navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position){
    lat = position.coords.latitude;
    lng =  position.coords.longitude;
}

google.maps.event.addDomListener(window, 'load', function() {
    var objMarker;
    var objMap;
    var latlng = new google.maps.LatLng(lat, lng);

    var optMap = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true
    };
    objMap = new google.maps.Map(document.getElementById('map'), optMap);

    //初期位置の住所取得
    getAddress(latlng);

    //マーカー
    objMarker = new google.maps.Marker({
        position: latlng,
        map: objMap
    });

    // マップクリックイベントを追加 
    google.maps.event.addListener(objMap, 'click', function(e) {
        // ポジションを変更 
        objMarker.position = e.latLng;
        // マーカーをセット 
        objMarker.setMap(objMap);
        // 地図の中心をマーカーの位置に変更 
        objMap.setCenter(e.latLng);
        // 住所取得
        getAddress(e.latLng);
    });
});

function getAddress(position){
    var geocoder = new google.maps.Geocoder();
    var postalcode = "";
    var level1 = "";
    var locality = "";
    var sublocality = "";
    var level2 = "";
    var level3 = "";
    var level4 = "";
    var level5 = "";
    var levelPlus1 = "";
    var levelPlus2 = "";
    var premise = "";
    var street = "";

    //緯度/経度書き出し
    document.getElementById( 'lat' ).innerHTML = position.lat() ;
    document.getElementById( 'lng' ).innerHTML = position.lng() ;

    geocoder.geocode({'latLng': position, 'language': 'ja'}, function(results, status) {
        if(status==google.maps.GeocoderStatus.OK){
            if (results[1]) {
                //郵便番号+住所書き出し
                document.getElementById( 'address' ).innerHTML = results[0].formatted_address.replace(/^日本, /, '');

                for(var i=0;i < results[0].address_components.length; i++){
                    for(var j=0; j < results[0].address_components[i].types.length; j++){
                        if(results[0].address_components[i].types[j] == "postal_code"){
                            postalcode = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "administrative_area_level_1"){
                            level1 = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "locality"){
                            locality = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "sublocality"){
                            sublocality = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "sublocality_level_2"){
                            level2 = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "sublocality_level_3"){
                            level3 = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "sublocality_level_4"){
                            level4 = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "sublocality_level_5"){
                            level5 = results[0].address_components[i].short_name;
                        }
                        if(results[0].address_components[i].types[j] == "premise"){
                            premise = results[0].address_components[i].short_name;
                        }
                    }
                }
                //番地を繋ぐハイフン2つ
                if ( level3 !== ""  && level4 !== ""){
                    levelPlus1= "−";
                }
                if ( level4 !== ""  && level5 !== ""){
                    levelPlus2= "−";
                }

                //番地
                street = level2 + level3 + levelPlus1 +  level4 + levelPlus2 + level5;

                //この下のフォーム住所書き出し innerHTMLではなくvalueなので注意
                document.getElementById( 'postal' ).value = postalcode;
                document.getElementById( 'addr1' ).value = level1;
                document.getElementById( 'addr2' ).value = locality + " " + sublocality;
                document.getElementById( 'addr3' ).value = street;
                document.getElementById( 'addr4' ).value = premise;
            } else {
                document.getElementById( 'address' ).innerHTML = '取得できませんでした';
            }
        } else {
            document.getElementById( 'address' ).innerHTML = 'エラー: 取得できませんでした';
        }
    });
}