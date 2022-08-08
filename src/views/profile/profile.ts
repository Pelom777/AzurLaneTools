import { Application, Container } from 'pixi.js'
import { Spine } from '@pixi-spine/all-3.8'

export const init = (name: string) => {
  const app = new Application()
  const container = document.getElementById('char')
  container.appendChild(app.view)
  app.renderer.resize(container.offsetWidth, container.offsetHeight)
  app.loader
    .add('char', `https://sd.al.pelom.cn/assets/spine/${name}/${name}.skel`)
    .load((loader, resources) => {
      const spine = new Container()
      spine.position.set(180, app.screen.height - 80)
      const char = new Spine(resources.char.spineData)
      char.scale.set(0.5)
      spine.addChild(char)
      app.stage.addChild(spine)
      if (char.state.hasAnimation('normal'))
        char.state.setAnimation(0, 'normal', true)
    })
}