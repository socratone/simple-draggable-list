function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData('list', e.target.id);
}

function dragEnter(e) {
  e.target.style.background = 'coral';
}

function dragLeave(e) {
  e.target.style.background = '';
}

function drop(e) {
  e.preventDefault();
  e.target.style.background = ''; // 내려 놓은 라인(div)의 색을 원래대로 되돌린다.
  const id = event.dataTransfer.getData('list'); // 드래그할 때 저장했던 엘리먼트의 아이디를 가져온다.
  const list = document.getElementById(id);
  list.nextElementSibling.remove(); // 옮기기 전 리스트의 아래쪽 라인(div) 역할을 했던 엘리먼트를 삭제한다.
  e.target.after(list); // 내려 놓은 라인(div) 다음에 리스트가 오게 한다.
  list.after(document.createElement('div')); // 리스트 다음에 새로운 라인(div)을 추가한다.
}

const lis = document.getElementsByTagName('li');
for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener('dragstart', drag);
}

const divs = document.getElementsByTagName('div');
for (let i = 0; i < divs.length; i++) {
  divs[i].addEventListener('drop', drop);
  divs[i].addEventListener('dragover', allowDrop);
  divs[i].addEventListener('dragenter', dragEnter);
  divs[i].addEventListener('dragleave', dragLeave);
}
