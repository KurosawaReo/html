
/* 
  ▼ ===== スライド式サイド目次 ===== ▼
*/
const tocElems  = document.getElementsByClassName('side-toc');
const touchArea = document.querySelector('.side-toc-touch-area');

/* 開く（スマホ：端タップ）*/
if (touchArea) {
  touchArea.addEventListener('click', (e) => {
    e.stopPropagation(); // 外タップ判定に流さない
    for (let toc of tocElems) {
      toc.classList.add('open');
    }
  });
}

/* サイド目次内部をタップしても閉じない */
for (let toc of tocElems) {
  toc.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // PC用 hover
  toc.addEventListener('mouseenter', () => {
    toc.classList.add('open');
  });
  toc.addEventListener('mouseleave', () => {
    toc.classList.remove('open');
  });
}

/* 外側タップで閉じる */
document.addEventListener('click', () => {
  for (let toc of tocElems) {
    toc.classList.remove('open');
  }
});

// github用.
document.getElementById("github-reflect-line").onclick = () => {
  location.href = "https://github.com/KurosawaReo/2025_shinkyu_zenki";
};

/* 
  ▼ ===== slick ===== ▼
*/
$(function(){
  //これを実行することでスライダーが動くようになる.
  $('#img-slider').slick({
    dots: true,          //スライドの点を出すかどうか.
    infinity: true,      //無限にスクロールするか.
    autoplay: true,      //自動再生するか.
    accessibility: true, //左右のボタンでスライダーを切り替えるか.
    slidesToShow: 1,     //何個スライドを並べて表示するか.
    slidesToScroll: 1,   //何スライドずつ動くか.
  });
});