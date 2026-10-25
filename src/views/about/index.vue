<template>
  <div class="about">
    <section class="hero">
      <h1>碧蓝航线工具箱</h1>
      <p class="tagline">舰船图鉴 · 立绘浏览 · 数据工具</p>
      <el-tag type="info" effect="plain">此应用仅供学习，请勿用作其他用途</el-tag>
    </section>

    <section class="card">
      <h2>技术栈</h2>
      <div class="stack-group">
        <h3>前端</h3>
        <ul>
          <li>
            <el-icon :size="20"><i-logos-Vue /></el-icon>
            <span>Vue 3</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-Vitejs /></el-icon>
            <span>Vite</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-TypescriptIcon /></el-icon>
            <span>TypeScript</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-Sass /></el-icon>
            <span>Sass</span>
          </li>
          <li>
            <el-icon :size="20"><i-ep-ElementPlus /></el-icon>
            <span>Element Plus</span>
          </li>
          <li>
            <el-icon :size="20"><i-simple-icons-Apacheecharts /></el-icon>
            <span>ECharts</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-Pixijs /></el-icon>
            <span>PixiJS</span>
          </li>
        </ul>
      </div>
      <div class="stack-group">
        <h3>后端</h3>
        <ul>
          <li>
            <el-icon :size="20"><i-logos-Python /></el-icon>
            <span>Python</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-Flask /></el-icon>
            <span>Flask</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-Gunicorn /></el-icon>
            <span>Gunicorn</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-MysqlIcon /></el-icon>
            <span>MySQL</span>
          </li>
        </ul>
      </div>
      <div class="stack-group">
        <h3>部署</h3>
        <ul>
          <li>
            <el-icon :size="20"><i-logos-DockerIcon /></el-icon>
            <span>Docker</span>
          </li>
          <li>
            <el-icon :size="20"><i-logos-Nginx /></el-icon>
            <span>Nginx</span>
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
          <a class="link" href="https://github.com/Pelom777/AzurLaneTools" target="_blank" rel="noopener">
            <el-icon :size="18"><i-logos-GithubIcon /></el-icon>
            <span>GitHub</span>
          </a>
          <a class="link" href="https://www.buymeacoffee.com/pelom" target="_blank" rel="noopener">
            <el-icon :size="18"><i-simple-icons-Buymeacoffee /></el-icon>
            <span>Buy Me a Coffee</span>
          </a>
          <a class="link" href="https://afdian.com/a/pelom" target="_blank" rel="noopener">
            <el-icon :size="18"><i-ep-Link /></el-icon>
            <span>爱发电</span>
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