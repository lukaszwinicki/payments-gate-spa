<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          💳 Payments Gate
        </router-link>
        <div class="nav-menu">
          <router-link to="/" class="nav-link" active-class="active">
            Home
          </router-link>
          <router-link to="/payments" class="nav-link" active-class="active">
            Payments
          </router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Payments Gate SPA. Built with Vue 3 + TypeScript.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ecf0f1;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #ecf0f1;
  background-color: #34495e;
}

.main-content {
  min-height: calc(100vh - 140px);
  padding: 2rem;
}

.footer {
  background-color: #34495e;
  color: #ecf0f1;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
