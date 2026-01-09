
/* 
  ▼ ===== スライド式サイド目次 ===== ▼
*/
const toc = document.getElementsByClassName('side-toc');

for (let i of toc){
    i.addEventListener('mouseenter', () => {
      i.classList.add('open');
    });
    
    i.addEventListener('mouseleave', () => {
      i.classList.remove('open');
    });
}