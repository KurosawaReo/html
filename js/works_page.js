
/* =============================== 
  ▼ スライド式サイド目次 ▼
================================ */
const tocElems  = document.getElementsByClassName('side-toc');
const touchArea = document.querySelector('.side-toc-touch-area');

/* スマホ操作 | タップで開く */
if (touchArea) {
  touchArea.addEventListener('click', (e) => {
    e.stopPropagation(); // 外タップ判定に流さない
    for (let toc of tocElems) {
      toc.classList.add('open');
    }
  });
}
/* スマホ操作 | サイド目次内部をタップしても閉じない */
for (let toc of tocElems) {
  toc.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}
/* スマホ操作 | 外側タップで閉じる */
document.addEventListener('click', () => {
  for (let toc of tocElems) {
    toc.classList.remove('open');
  }
});

/* PC操作 */
if (window.matchMedia('(hover: hover)').matches) {
  
  const EDGE_SIZE = 20; // 左端の判定幅（px）
  const CLOSE_OFFSET = 220; // パネル幅くらい

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;

    for (let toc of tocElems) {
      if (x <= EDGE_SIZE) {
        toc.classList.add('open');
      } else if (x > CLOSE_OFFSET) {
        toc.classList.remove('open');
      }
    }
  });
}

/* =============================== 
  ▼ slick ▼
================================ */
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