const DATA = [
  { id: 1, title: '홈' },
  { id: 2, title: '프로필' },
  { id: 3, title: '포트폴리오1' },
  { id: 4, title: '포트폴리오2' },
  { id: 5, title: '포트폴리오3' },
];

const HOVER_LINE_COLOR = 'black';
const DRAGGED_ELEMENT_COLOR = 'gray';

function dragStart(e) {
  e.dataTransfer.setData('dragged', e.target.id); // 드래그 할 때 dragged라는 이름으로 저장
  e.target.style.background = DRAGGED_ELEMENT_COLOR;
  setTimeout(() => {
    const dropAreas = document.getElementsByClassName('drop-area');
    [...dropAreas].forEach((area) => {
      area.classList.add('expand'); // 드래그 할 때 expand 속성을 적용
    });
  }, 0);
}

function dragEnd(e) {
  e.target.style.background = '';
  const dropAreas = document.getElementsByClassName('drop-area');
  [...dropAreas].forEach((area) => {
    area.classList.remove('expand');
  });
}

function allowDrop(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.target.parentNode.style.background = HOVER_LINE_COLOR;
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

  const newLine = createLineElement();
  dragged.after(newLine); // dragged 다음에 새로운 라인(div)을 추가한다.
}

function createDraggableElement({ id, title }) {
  const div = document.createElement('div');
  div.id = 'draggable-element-' + id;
  div.classList.add('draggable-element');
  div.addEventListener('dragstart', dragStart);
  div.addEventListener('dragend', dragEnd);
  div.draggable = 'true';
  div.innerText = title;
  return div;
}

function createLineElement() {
  const line = document.createElement('div');
  line.classList.add('line-element');
  const newDropArea = document.createElement('div');
  newDropArea.classList.add('drop-area');
  line.append(newDropArea);

  newDropArea.addEventListener('drop', drop);
  newDropArea.addEventListener('dragover', allowDrop);
  newDropArea.addEventListener('dragenter', dragEnter);
  newDropArea.addEventListener('dragleave', dragLeave);
  return line;
}

function createSectionChildren(DATA) {
  const section = document.getElementById('section');
  for (let i = 0; i < DATA.length; i++) {
    section.append(createLineElement());
    section.append(createDraggableElement(DATA[i]));
  }
  section.append(createLineElement());
}

function init() {
  createSectionChildren(DATA);
}

init();
