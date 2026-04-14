(async function () {
  try {
    const res = await fetch("/api/admin/auth/me", {
      credentials: "include",
    });
    const data = await res.json();

    if (!data.ok) {
      window.location.href = "/admin/auth/login.html";
    }
  } catch (err) {
    window.location.href = "/admin/auth/login.html";
  }
})();
