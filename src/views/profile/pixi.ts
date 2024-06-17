export * from '@pixi/constants'
export * from '@pixi/math'
export * from '@pixi/runner'
export * from '@pixi/settings'
export * from '@pixi/ticker'
import * as utils from '@pixi/utils'
export { utils }
export * from '@pixi/display'
export * from '@pixi/core'
export * from '@pixi/extract'
export * from '@pixi/sprite'
export * from '@pixi/app'
export * from '@pixi/interaction'
export * from '@pixi/loaders'

// Renderer plugins
import { Extract } from '@pixi/extract'
import { BatchRenderer } from '@pixi/core'
import { InteractionManager } from '@pixi/interaction'

// Application plugins
import { AppLoaderPlugin } from '@pixi/loaders'
import { TickerPlugin } from '@pixi/ticker'

import { extensions } from '@pixi/core'
extensions.add(
  Extract,
  BatchRenderer,
  InteractionManager,
  AppLoaderPlugin,
  TickerPlugin
)