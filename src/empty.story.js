import StoryManager from './lib/storyManager';
import Story from './lib/story';

class EmptyStory extends Story {}

StoryManager.register('empty', EmptyStory);
