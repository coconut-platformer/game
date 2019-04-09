import storyManager from './lib/storyManager';
import './*.story.js';

const list = document.getElementById('list');
storyManager.listStories().forEach(story => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.innerText = story.name;
  button.addEventListener('click', () => story.view());
  li.appendChild(button);
  list.appendChild(li);
});
