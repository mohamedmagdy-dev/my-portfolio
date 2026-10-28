import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config";
import { uploadToCloudinary } from "../../services/cloudinaryService";

const COLLECTION_NAME = "projects";

/**
 * Get all projects ordered by order ASC
 */
export async function getAllProjects() {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Falling back to unordered query:", error.message);
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return data.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

/**
 * Get projects to display in SelectedWork
 */
export async function getSelectedProjects() {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("showInSelected", "==", true),
      orderBy("order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("showInSelected", "==", true)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return data.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

/**
 * Get projects to display in HorizontalWorkSlider
 */
export async function getSliderProjects() {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("showInSlider", "==", true),
      orderBy("order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("showInSlider", "==", true)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return data.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

/**
 * Add a new project (Uploads images to Cloudinary if files are provided)
 */
export async function createProject(projectData, desktopImageFile, mobileImageFile) {
  if (!db) throw new Error("Firestore is not initialized. Please configure .env");

  let desktopImageUrl = projectData.desktopImage || "";
  let mobileImageUrl = projectData.mobileImage || "";

  if (desktopImageFile) {
    desktopImageUrl = await uploadToCloudinary(desktopImageFile, "portfolio/desktop");
  }
  if (mobileImageFile) {
    mobileImageUrl = await uploadToCloudinary(mobileImageFile, "portfolio/mobile");
  }

  const payload = {
    title: projectData.title || "",
    category: projectData.category || "",
    description: projectData.description || "",
    projectLink: projectData.projectLink || "",
    githubLink: projectData.githubLink || "",
    desktopImage: desktopImageUrl,
    mobileImage: mobileImageUrl,
    showInSelected: Boolean(projectData.showInSelected),
    showInSlider: Boolean(projectData.showInSlider),
    order: Number(projectData.order) || 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
  return { id: docRef.id, ...payload };
}

/**
 * Update an existing project
 */
export async function updateProject(id, projectData, desktopImageFile, mobileImageFile) {
  if (!db) throw new Error("Firestore is not initialized. Please configure .env");

  let desktopImageUrl = projectData.desktopImage || "";
  let mobileImageUrl = projectData.mobileImage || "";

  if (desktopImageFile) {
    desktopImageUrl = await uploadToCloudinary(desktopImageFile, "portfolio/desktop");
  }

  if (mobileImageFile) {
    mobileImageUrl = await uploadToCloudinary(mobileImageFile, "portfolio/mobile");
  }

  const payload = {
    title: projectData.title || "",
    category: projectData.category || "",
    description: projectData.description || "",
    projectLink: projectData.projectLink || "",
    githubLink: projectData.githubLink || "",
    desktopImage: desktopImageUrl,
    mobileImage: mobileImageUrl,
    showInSelected: Boolean(projectData.showInSelected),
    showInSlider: Boolean(projectData.showInSlider),
    order: Number(projectData.order) || 1,
    updatedAt: serverTimestamp(),
  };

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, payload);
  return { id, ...payload };
}

/**
 * Delete a project from Firestore
 */
export async function deleteProject(id) {
  if (!db) throw new Error("Firestore is not initialized");
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  return id;
}
