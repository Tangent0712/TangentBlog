<template>
  <div class="content-area">
    <div class="page-header green">૮₍˶ᵔᵕᵔ˶₎ა {{ site.about.heading }} ૮₍˶ᵔᵕᵔ˶₎ა</div>

    <div class="about-page-card">
      <div class="card-header">■ {{ site.about.cardTitle }} ■</div>
      <div class="about-body">
        <div class="about-avatar-col">
          <div class="about-decorate">
            <img src="/decorate_photos/7.png" alt="" />
            <img src="/decorate_photos/6.png" alt="" />
          </div>
          <div class="about-big-avatar">
            <img v-if="site.avatar" :src="site.avatar" :alt="site.author" />
            <span v-else>{{ site.author[0] }}</span>
          </div>
          <span class="about-username">{{ site.author }}</span>
          <div class="about-kaomoji">૮ ´͈ ᗜ `͈ ა♡</div>
        </div>
        <div class="about-info-col">
          <div class="about-intro" v-if="site.about.intro && site.about.intro.length">
            <div v-for="line in site.about.intro" :key="line">{{ line }}</div>
          </div>
          <div class="about-contact-card">
            <div class="about-contact-title">✦ {{ site.about.contactsTitle }}</div>
            <div class="about-contact-row" v-for="contact in site.about.contacts" :key="contact.label">
              <span class="about-contact-label">{{ contact.label }}:</span>
              <span class="about-contact-val" v-for="value in contact.values" :key="value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="skill-card" v-for="section in site.about.sections" :key="section.title">
      <div class="skill-header">✦ {{ section.title }}</div>
      <div class="skill-list">
        <p v-if="section.text" class="skill-text">{{ section.text }}</p>
        <div class="skill-row" v-for="row in section.rows" :key="row.name">
          <span class="skill-name">{{ row.name }}</span>
          <span class="skill-value" v-html="row.value"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import site from '../config/site.js'
</script>
