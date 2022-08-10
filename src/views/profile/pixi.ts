export * from '@pixi/constants'
export * from '@pixi/math'
export * from '@pixi/runner'
export * from '@pixi/settings'
export * from '@pixi/ticker'
import * as utils from '@pixi/utils'
export { utils }
export * from '@pixi/display'
export * from '@pixi/core'
export * from '@pixi/sprite'
export * from '@pixi/app'
export * from '@pixi/interaction'

// Renderer plugins
import { BatchRenderer } from '@pixi/core'
import { InteractionManager } from '@pixi/interaction'

// Application plugins
import { AppLoaderPlugin } from '@pixi/loaders'
import { TickerPlugin } from '@pixi/ticker'

import { extensions } from '@pixi/core'
extensions.add(
  BatchRenderer,
  InteractionManager,
  AppLoaderPlugin,
  TickerPlugin
)