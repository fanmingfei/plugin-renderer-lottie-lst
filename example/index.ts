import { Game, GameObject, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { SpineSystem, Spine } from '../src'

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new SpineSystem(),
  ],
});

game.scene.transform.size = {
  width: 750,
  height: 1000
}

const go = new GameObject("text", {
  position: {
    x: 0,
    y: 0
  }
});

// 这里资源自己填写
resource.addResource([
  {
    name: 'anim',
    type: 'SPINE',
    src: {
      ske: {
        type: 'json',
      },
      atlas: {
        type: 'atlas',
      },
      image: {
        type: 'png',
      },
    },
  },
]);

const spine = new Spine({resource: 'anim', animationName: 'chui'});
go.addComponent(spine);
spine.on('complete', e => {
  console.log('动画播放结束', e.name);
});
spine.play('chui');

game.scene.addChild(go)