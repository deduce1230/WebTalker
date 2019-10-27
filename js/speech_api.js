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

      recognition.onresult = function (e) {
        // Web Speech APIが音声を解析したとき
        let result = e.results[0][0].transcript;
        textarea.value = result;
      };

      recognition.onend = function(){
        // Web Speech APIが音声終了と認識したとき
           recognition.stop();
           isRecognition = false;
           mic_btn.item(0).checked = true;
      }
});
