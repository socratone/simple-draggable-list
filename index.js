const dropAreas = document.getElementsByClassName('drop-area');

function allowDrop(e) {
  e.preventDefault();
}

function dragStart(e) {
  e.dataTransfer.setData('dragged', e.target.id); // 드래그 할 때 dragged라는 이름으로 저장
  // 드래그 할 때 expand 속성을 적용
  setTimeout(() => {
    [...dropAreas].forEach((area) => {
      area.classList.add('expand');
    });
  }, 0);
}

function dragEnd() {
  // 드래그가 끝나면 expand 속성을 없앰
  [...dropAreas].forEach((area) => {
    area.classList.remove('expand');
  });
}

function dragEnter(e) {
  e.target.parentNode.style.background = 'coral';
}

function dragLeave(e) {
  e.target.parentNode.style.background = '';
}

function drop(e) {
  e.preventDefault();
  e.target.parentNode.style.background = ''; // 내려 놓은 라인(div)의 색을 원래대로 되돌린다.

  const id = event.dataTransfer.getData('dragged'); // 드래그할 때 저장했던 엘리먼트의 아이디를 가져온다.
  const dragged = document.getElementById(id);

  dragged.nextElementSibling.remove(); // 옮기기 전 dragged의 아래쪽 라인(div) 역할을 했던 엘리먼트를 삭제한다.

  const line = e.target.parentNode;
  line.after(dragged); // 내려 놓은 drop-area의 부모인 line 다음에 dragged가 오게 한다.

  const newLine = createLine();
  dragged.after(newLine); // dragged 다음에 새로운 라인(div)을 추가한다.
}

function createLine() {
  const line = document.createElement('div');
  line.classList.add('line');
  const newDropArea = document.createElement('div');
  newDropArea.classList.add('drop-area');
  line.appendChild(newDropArea);

  newDropArea.addEventListener('drop', drop);
  newDropArea.addEventListener('dragover', allowDrop);
  newDropArea.addEventListener('dragenter', dragEnter);
  newDropArea.addEventListener('dragleave', dragLeave);
  return line;
}

function init() {
  const lis = document.getElementsByTagName('li');
  [...lis].forEach((li) => {
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('dragend', dragEnd);
  });

  [...dropAreas].forEach((area) => {
    area.addEventListener('drop', drop);
    area.addEventListener('dragover', allowDrop);
    area.addEventListener('dragenter', dragEnter);
    area.addEventListener('dragleave', dragLeave);
  });
}

init();
