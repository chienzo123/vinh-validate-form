document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form__body");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  const role = document.getElementById("role");
  const store = document.getElementById("store");
  const position = document.getElementById("position");

  // Create error message element right below inputs
// Accept either an input element or an input id string.
  const addError = (inputOrId, message) => {
    const id = typeof inputOrId === "string" ? inputOrId : inputOrId.id;
    const errorDiv = document.getElementById(`${id}-error`);
    if (errorDiv) errorDiv.textContent = message;
  };

  const removeError = (inputOrId) => {
    const id = typeof inputOrId === "string" ? inputOrId : inputOrId.id;
    const errorDiv = document.getElementById(`${id}-error`);
    if (errorDiv) errorDiv.textContent = "";
  };


  // Validation functions
  const validateName = () => {
    const value = username.value.trim();
    if (!value) {
      addError(username, "Name cannot be empty");
      return false;
    }
    if (!/^[A-Z][a-zA-Z ]*$/.test(value)) {
      addError(username, "First letter must be uppercase");
      return false;
    }
    removeError(username);
    return true;
  };

  const validateEmail = () => {
    const value = email.value.trim();
    if (!value) {
      addError(email, "Email cannot be empty");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      addError(email, "Invalid email format");
      return false;
    }
    removeError(email);
    return true;
  };

  const validatePassword = () => {
    const value = password.value.trim();
    if (!value) {
      addError(password, "Password cannot be empty");
      return false;
    }
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
      addError(password, "At least 8 chars, 1 uppercase, 1 special char");
      return false;
    }
    removeError(password);
    return true;
  };

  const validateConfirm = () => {
    const value = confirm.value.trim();
    if (!value) {
      addError(confirm, "Confirm password cannot be empty");
      return false;
    }
    if (value !== password.value.trim()) {
      addError(confirm, "Passwords do not match");
      return false;
    }
    removeError(confirm);
    return true;
  };

  const validateRole = () => {
    const value = role.value;
    if (!value) {
      addError(role, "Please select a role");
      return false;
    }
    removeError(role);
    return true;
  };

  const validatePosition = () => {
    if (role.value !== "Staff") return true;
    const value = position.value;
    if (!value) {
      addError(position, "Select a position");
      return false;
    }
    removeError(position);
    return true;
  };

  // Enable/disable store and position dynamically
  role.addEventListener("change", () => {
    removeError(role);
    store.value = "";
    position.value = "";
    if (role.value === "Manager") {
      store.disabled = false;
      position.disabled = true;
    } else if (role.value === "Staff") {
      store.disabled = true;
      position.disabled = false;
      updatePositionOptions();
    } else {
      store.disabled = true;
      position.disabled = true;
    }
  });

  

  // Realtime validation : Giúp hiển thị lỗi ngay lập tức, không phải chờ đến khi nhấn “Submit”.
  username.addEventListener("input", validateName);
  email.addEventListener("input", validateEmail);
  password.addEventListener("input", validatePassword);
  confirm.addEventListener("input", validateConfirm);
  role.addEventListener("change", validateRole);
  position.addEventListener("change", validatePosition);

  // Handle submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid =
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirm() &&
      validateRole() &&
      validatePosition();

    if (valid) {
      showModal();
    }
  });

  // Show modal
const showModal = () => {
  const modal = document.getElementById("modalContainer");
  const closeBtn = modal.querySelector(".modal__close");

  // Gán dữ liệu vào các phần tử trong modal
  document.getElementById("modalUsername").textContent = username.value;
  document.getElementById("modalEmail").textContent = email.value;
  document.getElementById("modalPassword").textContent = password.value;
  document.getElementById("modalRole").textContent = role.value;
  document.getElementById("modalStore").textContent = store.value || "N/A";
  document.getElementById("modalPosition").textContent = position.value || "N/A";

  // Hiển thị modal
  modal.classList.remove("hidden");

  // Xử lý nút đóng
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Đóng modal khi click ra ngoài
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
};

});
