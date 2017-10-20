/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */





var appCordova = {
	inited	: false,
	isMobile: false,

    // Application Constructor
    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
		
		window.setTimeout(function(){this.onWindowReady},500);   
	},
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
		this.inited		= true;
		this.isMobile	= true;

        this.receivedEvent("deviceready");
		_TR("device ready.");

		if( window.plugins && window.plugins.NativeAudio ) {
			this.audio	= window.plugins.NativeAudio;
			_TR("audio ready.");
		}else{
			this.audio	= null;
			_TR("audio unsupported!");
		}
    },

	onWindowReady	: function(){
		if(this.inited)return;
		this.inited		= true;
		this.isMobile	= false;
			
		if($("audio").length==0){
			$("body").append("<audio><source src=\"snd/0.wav\" type=\"audio/wav\"></audio>");
		}
		
		this.audio	= {
			play : function(name,scb,ecb,complete){
				$("audio").attr("src",sndSurfaces[name]);
				if($("audio").get(0)){
					$("audio")[0].play().catch(function(){});
					$("audio").on("ended",complete);	
				}
			},
			pause: function(name){
				if($("audio").get(0)){
					$("audio")[0].pause();
				}
			},
			stop: function(name){
				if($("audio").get(0)){
					$("audio")[0].stop();
				}
			},
			stop: function(name){
				if($("audio").get(0)){
					$("audio")[0].stop();
				}
			},
			preloadComplex: function(name){
			},
			releaseSound: function(name){
			},
		};
	},

    onDevicePause: function() {
        this.receivedEvent('deviceready');
		alert("pause");
    },

    onDeviceResume: function() {
        this.receivedEvent('deviceready');
		alert("resume");
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        _TR('Received Event: ' + id);
    },

	
	//-------------------------
	// FOR AUDIO
	audio		: null,

	sndSurfaces	: {},

	playSound	: function (name,successCallback, errorCallback, completeCallback){
		if( this.audio ) {
			this.audio.play( name,successCallback, errorCallback, completeCallback);
		}
	},

	stopSound	: function (name){
		if( this.audio ) {
			this.audio.stop( name );
		}
	},

	pauseSound	: function (name){
		if( this.audio ) {
			this.audio.pause( name );
		}
	},

	loadSound	: function (name,file){
		this.sndSurfaces[name]	= file;
		if( this.audio ) {
			// Preload audio resources 
			this.audio.preloadComplex( name, file, 1, 1, 0, function(msg){}, function(msg){_TR(msg);});
		}
	},

	releaseSound	: function (name){
		delete this.sndSurfaces[name];
		if( this.audio ) {
			this.audio.stop( name );
			this.audio.unload( name );
		}
	},

};


appCordova.initialize();