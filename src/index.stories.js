import storyManager from './lib/storyManager';
import './*.story.js';

const list = document.getElementById('list');

storyManager.onChange(() => {
  storyManager.listStories().forEach(story => {
    let li = document.querySelector(`li[data-name="${story.name}"]`);
    if (li) {
      li.className = story.active ? 'highlight' : '';
      return;
    }

    li = document.createElement('li');
    li.setAttribute('data-name', story.name);
    li.className = story.active ? 'highlight' : '';
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = story.name;
    button.addEventListener('click', () => story.view());
    li.appendChild(button);
    list.appendChild(li);
  });
});

storyManager.listStories()[0].view();
