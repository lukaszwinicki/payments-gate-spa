<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Welcome to Payments Gate</h1>
      <p class="hero-subtitle">
        Your secure and reliable payment processing solution
      </p>
      <div class="hero-actions">
        <router-link to="/payments" class="btn btn-primary">
          Get Started
        </router-link>
      </div>
    </div>

    <div class="features">
      <h2>Key Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Bank-level security with end-to-end encryption</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Fast</h3>
          <p>Lightning-fast payment processing</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h3>Global</h3>
          <p>Accept payments from anywhere in the world</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Analytics</h3>
          <p>Detailed reporting and analytics dashboard</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #667eea;
}

.features h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}
</style>
