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

      recognition.onresult = function (e) {
        // Web Speech API����������͂����Ƃ�
        let result = e.results[0][0].transcript;
        textarea.value = result;
      };

      recognition.onend = function(){
        // Web Speech API�������I���ƔF�������Ƃ�
           recognition.stop();
           isRecognition = false;
           mic_btn.item(0).checked = true;
      }
});
