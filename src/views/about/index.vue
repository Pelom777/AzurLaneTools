<script lang="ts" setup>
import Vue from '~icons/logos/vue'
import Vite from '~icons/logos/vitejs'
import TypeScript from '~icons/logos/typescript-icon'
import Sass from '~icons/logos/sass'
import ElementPlus from '~icons/ep/element-plus'
import ECharts from '~icons/simple-icons/apacheecharts'
import Pixi from '~icons/logos/pixijs'
import Python from '~icons/logos/python'
import Flask from '~icons/logos/flask'
import Gunicorn from '~icons/logos/gunicorn'
import MySQL from '~icons/logos/mysql-icon'
import Docker from '~icons/logos/docker-icon'
import Nginx from '~icons/logos/nginx'
import Github from '~icons/logos/github-icon'
import Coffee from '~icons/simple-icons/buymeacoffee'
import Link from '~icons/ep/link'

const stacks = [
  {
    label: '前端',
    items: [
      { label: 'Vue 3', icon: Vue },
      { label: 'Vite', icon: Vite },
      { label: 'TypeScript', icon: TypeScript },
      { label: 'Sass', icon: Sass },
      { label: 'Element Plus', icon: ElementPlus },
      { label: 'ECharts', icon: ECharts },
      { label: 'PixiJS', icon: Pixi },
    ],
  },
  {
    label: '后端',
    items: [
      { label: 'Python', icon: Python },
      { label: 'Flask', icon: Flask },
      { label: 'Gunicorn', icon: Gunicorn },
      { label: 'MySQL', icon: MySQL },
    ],
  },
  {
    label: '部署',
    items: [
      { label: 'Docker', icon: Docker },
      { label: 'Nginx', icon: Nginx },
    ],
  },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/Pelom777/AzurLaneTools', icon: Github },
  { label: 'Buy Me a Coffee', href: 'https://www.buymeacoffee.com/pelom', icon: Coffee },
  { label: '爱发电', href: 'https://afdian.com/a/pelom', icon: Link },
]
</script>

<template>
  <div class="about">
    <section class="hero">
      <h1>碧蓝航线工具箱</h1>
      <p class="tagline">舰船图鉴 · 立绘浏览 · 数据工具</p>
      <el-tag type="info" effect="plain">此应用仅供学习，请勿用作其他用途</el-tag>
    </section>

    <section class="card">
      <h2>技术栈</h2>
      <div v-for="group in stacks" :key="group.label" class="stack-group">
        <h3>{{ group.label }}</h3>
        <ul>
          <li v-for="item in group.items" :key="item.label">
            <el-icon :size="20"><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="card">
      <h2>作者</h2>
      <div class="author">
        <a class="author-info" href="https://pelom.cn" target="_blank" rel="noopener">
          <el-avatar :size="52" src="https://avatars.githubusercontent.com/u/48827064" />
          <span class="author-text">
            <strong>Pelom</strong>
            <em>pelom.cn</em>
          </span>
        </a>
        <div class="author-links">
          <a
            v-for="link in links"
            :key="link.label"
            class="link"
            :href="link.href"
            target="_blank"
            rel="noopener"
          >
            <el-icon :size="18"><component :is="link.icon" /></el-icon>
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
  max-width: $reading-max;
  margin: 0 auto;
}

.hero {
  padding: $space-6 0;
  text-align: center;

  h1 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 1px;
    color: $color-azure-darker;
  }

  .tagline {
    margin-top: $space-3;
    font-size: 13px;
    color: $color-text-2;
    letter-spacing: 2px;
  }

  .el-tag {
    margin-top: $space-4;
  }
}

.card {
  @include card-surface;
  margin-bottom: $space-4;
  padding: $space-5 $space-6;

  h2 {
    margin-bottom: $space-4;
    font-size: 15px;
    font-weight: 600;
    color: $color-text;
  }
}

.stack-group {
  & + & {
    margin-top: $space-4;
  }

  h3 {
    margin-bottom: $space-2;
    font-size: 12px;
    font-weight: 500;
    color: $color-text-2;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  li {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-3;
    font-size: 13px;
    color: $color-text;
    background: $color-bg;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
  }
}

.author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-5;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: $space-3;

  &:hover strong {
    color: $color-primary;
  }
}

.author-text {
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 16px;
    font-weight: 600;
    color: $color-text;
    transition: color .2s;
  }

  em {
    font-size: 12px;
    font-style: normal;
    color: $color-text-2;
  }
}

.author-links {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}

.link {
  display: flex;
  align-items: center;
  gap: $space-2;
  padding: $space-2 $space-4;
  font-size: 13px;
  color: $color-text;
  background: $color-bg;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  transition: border-color .2s, color .2s;

  &:hover {
    color: $color-primary;
    border-color: $color-gold;
  }
}
</style>