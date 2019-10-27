/* ===================================================================

 * Web Speech API操作用スクリプト

=================================================================== */
$(function() {
      const LANG_JAPAN = "ja-JP";
      const recognition = new webkitSpeechRecognition();
      const textarea    = document.querySelector('textarea');
      const button      = document.querySelector("input[type='checkbox']");
      const mic_btn     = document.getElementsByName("mic");

      var isRecognition = false;
      recognition.lang = LANG_JAPAN;

      button.addEventListener('click', function () {
        // チェックボックスを改造したトグルボタンを押した場合
        if(isRecognition){
           // 開始中なので、停止
           recognition.stop();
           isRecognition = false;
           // チェックボックスのチェックを外す（＝トグルオフ）
           mic_btn.item(0).checked = false;
        }else{
           // 停止中なので、開始
           recognition.start();
           isRecognition = true;
        }
      });

      setInterval(function(){
         if (mic_btn.item(0).checked){
             mic_btn.item(0).checked = false;
             recognition.start();
             isRecognition = true;
         }
      },5000);


      recognition.onresult = function (e) {
        // Web Speech APIが音声を解析したとき
        let result = e.results[0][0].transcript;
        textarea.value = result;

	      speaking();

      };

      recognition.onend = function(){
        // Web Speech APIが音声終了と認識したとき
           recognition.stop();
           isRecognition = false;
           mic_btn.item(0).checked = true;
      }


      // 発話機能をインスタンス化
      var msg = new SpeechSynthesisUtterance();

      function speaking() {  //定義されたFunction
        msg.volume = 1.0; // 音量 min 0 ~ max 1
        msg.rate = 0.6; // 速度 min 0 ~ max 10
        msg.pitch = 1.7; // 音程 min 0 ~ max 2

        msg.text = $('#txt').val(); // 喋る内容
        msg.lang = 'ja-JP'; // en-US or ja-JP

        var voices = window.speechSynthesis.getVoices();

        // 発話実行
        speechSynthesis.speak(msg);

      };

});
