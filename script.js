// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNOmS5fYOWkGrFXHWodFnbjfb5OHKa4ns",
  authDomain: "ecodrop-c571f.firebaseapp.com",
  projectId: "ecodrop-c571f",
  storageBucket: "ecodrop-c571f.firebasestorage.app",
  messagingSenderId: "338661782199",
  appId: "1:338661782199:web:9990829a46cd2ab57f9332"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SIGN UP FUNCTION ---
window.signup = async function() {
  const name = document.getElementById("signupName").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const msg = document.getElementById("signupMsg");

  if (!name || !phone || !password) {
    msg.textContent = "⚠️ Please fill in all fields.";
    msg.style.color = "red";
    return;
  }

  try {
    const q = query(collection(db, "users"), where("phone", "==", phone));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      msg.textContent = "❌ Phone number already registered.";
      msg.style.color = "red";
      return;
    }

    const docRef = await addDoc(collection(db, "users"), {
  name: name,
  phone: phone,
  password: password,
  points: 0,
  createdAt: new Date()
});

// ✅ Save user locally with Firestore ID
const userData = {
  id: docRef.id,   // <--- Firestore-generated ID
  name,
  phone,
  points: 0
};
localStorage.setItem("loggedUser", JSON.stringify(userData));


    msg.textContent = "✅ Account created successfully!";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html"; // 👈 redirects to login page
    }, 1500);

  } catch (error) {
    console.error("Signup error:", error);
    msg.textContent = "⚠️ Failed to create account. Try again.";
    msg.style.color = "red";
  }
};

