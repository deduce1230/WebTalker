/* ===================================================================

 * Web Speech API����p�X�N���v�g

=================================================================== */
$(function() {
      const LANG_JAPAN = "ja-JP";
      const recognition = new webkitSpeechRecognition();
      const textarea    = document.querySelector('textarea');
      const button      = document.querySelector("input[type='checkbox']");
      const mic_btn     = document.getElementsByName("mic");

      var isRecognition = false;
      var autoChecker;
      recognition.lang = LANG_JAPAN;

      button.addEventListener('click', function () {
        // �`�F�b�N�{�b�N�X�����������g�O���{�^�����������ꍇ
        if(isRecognition){
           // �J�n���Ȃ̂ŁA��~
           recognition.stop();
           isRecognition = false;
           // �`�F�b�N�{�b�N�X�̃`�F�b�N���O���i���g�O���I�t�j
           mic_btn.item(0).checked = false;
        }else{
           // ��~���Ȃ̂ŁA�J�n
           recognition.start();
           isRecognition = true;
        }
      });

      function StartAutoCheck(){
         autoChecker = setInterval(function(){
             if (mic_btn.item(0).checked == true){
                 mic_btn.item(0).checked = false;
                 recognition.start();
                 isRecognition = true;
             }
         },5000);
      };
      
      function StopAutoCheck(){
          clearInterval(autoChecker);
      }

      recognition.onresult = function (e) {
        // Web Speech API����������͂����Ƃ�
        let result = e.results[0][0].transcript;
        textarea.value = result;

          StopAutoCheck();
	      speaking();
          StartAutoCheck();

      };

      recognition.onend = function(){
        // Web Speech API�������I���ƔF�������Ƃ�
           recognition.stop();
           isRecognition = false;
           mic_btn.item(0).checked = true;
      };


      // ���b�@�\���C���X�^���X��
      var msg = new SpeechSynthesisUtterance();

      function speaking() {  //��`���ꂽFunction
        msg.volume = 1.0; // ���� min 0 ~ max 1
        msg.rate = 0.6; // ���x min 0 ~ max 10
        msg.pitch = 1.7; // ���� min 0 ~ max 2

        msg.text = $('#txt').val(); // ������e
        msg.lang = 'ja-JP'; // en-US or ja-JP

        var voices = window.speechSynthesis.getVoices();

        // ���b���s
        speechSynthesis.speak(msg);

      };

});
